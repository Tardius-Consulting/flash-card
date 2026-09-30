import { IAuthRepository } from "../repositories/IAuthRepository";
import { TokenFactory } from "../model/TokenFactory";
import { UserNotFoundException } from "./Errors/Exceptions";
import { CodeFactory } from "../model/CodeFactory";

export class LoginUseCase{
    constructor(private repository:IAuthRepository){}
    public async exec(email:string,password:string) {
        const result = await this.repository.getUser(email,password)
        if(!result)
            throw new UserNotFoundException()
        const {token,cryptoToken} = CodeFactory.generateRandomCode()
        this.repository.registerAutorizationCode(cryptoToken,result)
        return token
    }
}