import { ipcMain } from "electron";
import { LoginUseCase } from "./auth/LoginUseCase.js";
import { MockAuthRepository } from "./auth/MockAuthRepository.js";
const repository = new MockAuthRepository()
const login = new LoginUseCase(repository)

ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    console.log("init auth")
    login.exec(data.email,data.password)
    return
})