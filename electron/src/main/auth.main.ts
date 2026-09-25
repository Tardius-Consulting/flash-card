import { ipcMain } from "electron";
import { LoginUseCase } from "./auth/LoginUseCase.js";
import { MockAuthRepository } from "./auth/MockAuthRepository.js";
let repository = new MockAuthRepository()
let login = new LoginUseCase(repository)

ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    console.log("init auth")
    login.exec(data.email,data.password)
    return
})