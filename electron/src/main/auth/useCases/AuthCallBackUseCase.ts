import { CodeFactory } from "../model/CodeFactory";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { ITokenRepository } from "../repositories/ITokenRepository";
import { InvalidGrantException } from "./Errors/Exceptions";

export class AuthCallBackUseCase{
    constructor(private repository:ITokenRepository){}
    public async execute(code:string){
        const encryptCode = CodeFactory.encryptCode(code)
        const isValid = await this.repository.validateAutorizationCode(encryptCode)
        if(!isValid)throw new InvalidGrantException()
        const {token, cryptoToken} = CodeFactory.generateRandomCode()
        await this.repository.registerRefreshCode(cryptoToken,isValid)
        return token
    }
}