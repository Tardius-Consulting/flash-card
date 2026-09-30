import { IAuthRepository } from "../repositories/IAuthRepository";
import { UserNotFoundException } from "./Errors/Exceptions";
import { CodeFactory } from "../model/CodeFactory";
import { PasswordHasher } from "../model/IPassWordHash";

export class LoginUseCase{
    constructor(private repository:IAuthRepository,private hasher:PasswordHasher){}
    public async exec(email:string,password:string) {
        
        const result = await this.repository.getUser(email)
        if(!result)
            throw new UserNotFoundException()

        const isValid = await this.hasher.compare(password,result.password)
        if(!isValid) 
            throw new UserNotFoundException()

        const {token,cryptoToken} = CodeFactory.generateRandomCode()
        this.repository.registerAutorizationCode(cryptoToken,result)
        return token
    }
}