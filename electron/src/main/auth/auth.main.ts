import { ipcMain } from "electron";
import { LoginUseCase } from "./useCases/LoginUseCase.js";
import { MockAuthRepository } from "./repositories/MockAuthRepository.js";
import { InvalidGrantException, UserNotFoundException } from "./useCases/Errors/Exceptions.js";
import { AuthCallBackUseCase } from "./useCases/AuthCallBackUseCase.js";
import { InitSessionUseCase } from "./useCases/InitSessionUseCase.js";
import { setJWT } from "../index.js";
import { RegisterUseCase } from "./useCases/RegisterUserUseCase.js";
import { Argon2PasswordHash } from "./repositories/Argon2PasswordHash.js";
const repository = new MockAuthRepository()
const hasher = new Argon2PasswordHash()
const login = new LoginUseCase(repository,hasher)
const authCallback = new AuthCallBackUseCase(repository)
const initSession = new InitSessionUseCase(repository)
const register = new RegisterUseCase(repository,hasher)

ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    console.log("init auth")
    try{
        let code = login.exec(data.email,data.password)
        ipcMain.emit('auth:handleAuthCallback',code)
    }catch(err){
        if(err instanceof UserNotFoundException)
            return{ok:false,message:err.message}
        return{ok:false,message:"Error not found!"}
    }
})

ipcMain.handle('auth:initLogin',async(event)=>{
    ipcMain.emit('auth:handleAuthCallback')
})

ipcMain.handle('auth:handleAuthCallback',async (event,code)=>{
    try{
        let token = await authCallback.execute(code)
        ipcMain.emit('auth:initSession',token)
    }catch(err){
        if(err instanceof InvalidGrantException)console.log(err.message)
    }
})

ipcMain.handle('auth:initSession',async(event,token)=>{
    const jwt = await initSession.execute(token)
    setJWT(jwt)
    console.log("token emitido:",token)
})

ipcMain.handle('auth:register',async(event,data:{email:string,password:string})=>{
    try{
        register.execute(data.email,data.password)
        ipcMain.emit('auth:Login',data)
    }catch(err){
        console.log(err)
    }
})