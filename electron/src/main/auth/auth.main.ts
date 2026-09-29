import { ipcMain } from "electron";
import { LoginUseCase } from "./useCases/LoginUseCase.js";
import { MockAuthRepository } from "./repositories/MockAuthRepository.js";
import { UserNotFoundException } from "./useCases/Errors/Exceptions.js";
const repository = new MockAuthRepository()
const login = new LoginUseCase(repository)

ipcMain.handle('auth:Login',async (event,data:{email:string,password:string})=>{
    console.log("init auth")
    try{
        login.exec(data.email,data.password)
    }catch(err){
        if(err instanceof UserNotFoundException)
            return{ok:false,message:err.message}
        return{ok:false,message:"Error not found!"}
    }
})