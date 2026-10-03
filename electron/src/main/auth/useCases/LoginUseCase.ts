import { IAuthRepository } from "../repositories/IAuthRepository";
import { UserNotFoundException } from "./Errors/Exceptions";
import { CodeFactory } from "../model/CodeFactory";
import { PasswordHasher } from "../model/IPassWordHash";
import { ITokenRepository } from "../repositories/ITokenRepository";
import { IUserRepository } from "../repositories/IUserRepository";

export class LoginUseCase{
    constructor(
        private userRepository:IUserRepository,
        private tokenRepository:ITokenRepository,
        private hasher:PasswordHasher){}
    public async exec(email:string,password:string) {
        
        const result = await this.userRepository.getUser(email) as {password:string}
        if(!result)
            throw new UserNotFoundException()

        const isValid = await this.hasher.compare(password,result.password)
        if(!isValid) 
            throw new UserNotFoundException()

        const {token,cryptoToken} = CodeFactory.generateRandomCode()
        this.tokenRepository.registerAutorizationCode(cryptoToken,result)
        return token
    }
}