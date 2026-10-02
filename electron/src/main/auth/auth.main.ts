import { ipcMain, safeStorage } from "electron";
import { LoginUseCase } from "./useCases/LoginUseCase.js";
import { MockAuthRepository } from "./repositories/MockAuthRepository.js";
import { InvalidGrantException, UnAutorizedException, UserNotFoundException } from "./useCases/Errors/Exceptions.js";
import { AuthCallBackUseCase } from "./useCases/AuthCallBackUseCase.js";
import { InitSessionUseCase } from "./useCases/InitSessionUseCase.js";
import { getChalengeID, getJWT, getResetToken, setChalengeID, setJWT, setResetToken } from "../index.js";
import { RegisterUseCase } from "./useCases/RegisterUserUseCase.js";
import { Argon2PasswordHash } from "./repositories/Argon2PasswordHash.js";
import { abrirJanelaDeLogin } from "./login.window.js";
import { TokenFactory } from "./model/TokenFactory.js";
import { validateJWTUseCase } from "./useCases/ValidateJWTUseCase.js";
import Store from 'electron-store';
import { ChangePasswordUseCase } from "./useCases/ChangePasswordUseCase.js";

const repository = new MockAuthRepository()
const hasher = new Argon2PasswordHash()
const factory = new TokenFactory()
const login = new LoginUseCase(repository,hasher)
const authCallback = new AuthCallBackUseCase(repository)
const initSession = new InitSessionUseCase(repository,factory)
const register = new RegisterUseCase(repository,hasher)
const validateJWT = new validateJWTUseCase(factory)
const store = new (Store as any).default()
const changePassword = new ChangePasswordUseCase(repository,hasher)


ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    const result = await handleLogin(data)
    event.sender.send("render:authResult",result)
})

ipcMain.handle('auth:register',async(event,data:{email:string,password:string,ask:string,answer:string})=>{
    try{
        await register.execute(data)
        const result = await handleLogin(data)
        return result
    }catch(err){
        return {ok:false,message:err.message}
    }
})

async function handleLogin(data:{email:string,password:string}) {
    try{
        const code = await login.exec(data.email,data.password)
        const result = await handleAuthCallback(code)
        return result
    }catch(err){
        if(err instanceof UserNotFoundException)
            return{ok:false,message:err.message}
        return{ok:false,message:"Error not found!"}
    }
}

ipcMain.handle('auth:initLogin',async(event)=>{
    abrirJanelaDeLogin(async(code:string)=>{
        const result = await handleAuthCallback(code)
        event.sender.send("render:authResult",result)
    })
})

async function handleAuthCallback(code){
    try{
        const refresh = await authCallback.execute(code)
        await saveRefreshToken(refresh)
        const result = await generateSession(refresh)
        return result
    }catch(err){
        if(err instanceof InvalidGrantException)return {ok:false,message:err.message}
        return {ok:false,message:"UnExpected Error: "+err.message}
    }
}

async function saveRefreshToken(refresh:string) {
    if (safeStorage.isEncryptionAvailable()) {
        const encryptedBuffer = safeStorage.encryptString(refresh);
        store.set('refreshToken', encryptedBuffer.toString('base64'));
        return true;
    }
    throw new Error('Criptografia não disponível neste sistema.');
}

async function getRefreshToken() {
    const encryptedBase64 = store.get('refreshToken')as string|null;
    if (!encryptedBase64) return null;

    if (safeStorage.isEncryptionAvailable()) {
        const buffer = Buffer.from(encryptedBase64, 'base64');
        return safeStorage.decryptString(buffer);
    }
    return null;
}

async function generateSession(refresh:string){
    try{
        const jwt = await initSession.execute(refresh)
        setJWT(jwt)
        return{ok:true,message:"Sessão iniciada com sucesso!"}
    }catch(err){
        return {ok:false,message:"UnExpected Error: "+err.message}
    }
}

ipcMain.handle('auth:me',async()=>{
    try{
        const result = await validateSession()
        if(!result.ok) throw new UnAutorizedException()
        return{ok:true,message:"err.message"};
    }catch(err){
        if(err instanceof UnAutorizedException)
        try{
            const refresh = await getRefreshToken()
            if(!refresh)return{ok:false,message:"UnAutorized!"};
            const result = await generateSession(refresh)
            return result
        }catch(err){
            return {ok:false,message:err.message}
        }
        else return{ok:false,message:err.message}
    }
})

async function validateSession() {
    try{
        const jwt = getJWT()
        const data = validateJWT.execute(jwt)
        return{ok:true,message:"Sessão validada",data}
    }catch(err){
        return {ok:false, message:err.message}
    }
}

ipcMain.handle("auth:changePassword",async (event,password)=>{
    try{
        const token = getResetToken()
        await changePassword.change(password,token)
        return {ok:true,message:"Senha alterada com sucesso!"}
    }catch(err){
        return{ok:false,message:err.message}
    }
})

ipcMain.handle("auth:getSecurityAsk",async (event,email:string)=>{
    const ask = await changePassword.getSecurityQuestion(email)
    setChalengeID(ask.chalenge_id)
    return ask
})

ipcMain.handle('auth:validateAnswer',async(event,answer:string)=>{
    try{
        const chalenge_id = getChalengeID()
        const result = await changePassword.validateAnswer(answer,chalenge_id)
        setResetToken(result)
        return true;
    }catch(err){
        console.log(err)
        return false
    }
})