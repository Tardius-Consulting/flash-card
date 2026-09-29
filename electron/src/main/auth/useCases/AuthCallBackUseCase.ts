import { CodeFactory } from "../model/CodeFactory";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { InvalidGrantException } from "./Errors/Exceptions";

export class AuthCallBackUseCase{
    constructor(private repository:IAuthRepository){}
    public async execute(code:string){
        let isValid = await this.repository.validateCode(code)
        if(!isValid)throw new InvalidGrantException()
        const refresh = CodeFactory.generateRandomCode()
        await this.repository.registerRefreshCode(refresh)
        return refresh
    }
}