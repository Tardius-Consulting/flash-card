import { ipcMain } from "electron";
import { LoginUseCase } from "./useCases/LoginUseCase.js";
import { MockAuthRepository } from "./repositories/MockAuthRepository.js";
import { InvalidGrantException, UserNotFoundException } from "./useCases/Errors/Exceptions.js";
import { AuthCallBackUseCase } from "./useCases/AuthCallBackUseCase.js";
import { InitSessionUseCase } from "./useCases/InitSessionUseCase.js";
import { setJWT } from "../index.js";
import { RegisterUseCase } from "./useCases/RegisterUserUseCase.js";
import { Argon2PasswordHash } from "./repositories/Argon2PasswordHash.js";
import { abrirJanelaDeLogin } from "../login.window.js";
const repository = new MockAuthRepository()
const hasher = new Argon2PasswordHash()
const login = new LoginUseCase(repository,hasher)
const authCallback = new AuthCallBackUseCase(repository)
const initSession = new InitSessionUseCase(repository)
const register = new RegisterUseCase(repository,hasher)

ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    const result = await handleLogin(data)
    event.sender.send("render:authResult",result)
})

ipcMain.handle('auth:register',async(event,data:{email:string,password:string})=>{
    try{
        await register.execute(data.email,data.password)
        await handleLogin(data)
    }catch(err){
        console.log(err)
    }
})

async function handleLogin(data:{email:string,password:string}) {
    console.log("init auth")
    try{
        const code = login.exec(data.email,data.password)
        await handleAuthCallback(code)
        return {ok:true,message:"Login realizado com sucesso!"}
    }catch(err){
        if(err instanceof UserNotFoundException)
            return{ok:false,message:err.message}
        return{ok:false,message:"Error not found!"}
    }
}

ipcMain.handle('auth:initLogin',async(event)=>{
    abrirJanelaDeLogin(handleAuthCallback)
})

async function handleAuthCallback(code){
    try{
        const token = await authCallback.execute(code)
        await validateSession(token)
    }catch(err){
        if(err instanceof InvalidGrantException)console.log(err.message)
    }
}

async function validateSession(token){
    const jwt = await initSession.execute(token)
    setJWT(jwt)
    console.log("token emitido:",token)
}