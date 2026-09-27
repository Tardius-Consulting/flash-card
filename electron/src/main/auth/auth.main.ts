import { ipcMain } from "electron";
import { LoginUseCase } from "./useCases/LoginUseCase.js";
import { MockAuthRepository } from "./repositories/MockAuthRepository.js";
const repository = new MockAuthRepository()
const login = new LoginUseCase(repository)

ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    console.log("init auth")
    login.exec(data.email,data.password)
    return
})