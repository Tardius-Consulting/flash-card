import { CodeFactory } from "../model/CodeFactory";
import { PasswordHasher } from "../model/IPassWordHash";
import { ITokenRepository } from "../repositories/ITokenRepository";
import { IUserRepository } from "../repositories/IUserRepository";

export class ChangePasswordUseCase{
    constructor(
        private userRepository:IUserRepository,
        private tokenRepository:ITokenRepository,
        private hasher:PasswordHasher
    ){}
    public async change(password,token){
        const hash_token = CodeFactory.encryptCode(token)
        const userID = await this.tokenRepository.validateResetCode(hash_token)
        const hash_password = await this.hasher.hash(password)
        await this.userRepository.changePassword(userID,hash_password)
    }
    public async validateAnswer(answer:string,chalenge_id:string){
        const crypto = CodeFactory.encryptCode(chalenge_id)
        const email = await this.tokenRepository.validateChalengeID(crypto)
        const user = (await this.userRepository.getUser(email)) as {answer:string,userID:string}
        const validateAnswer = await this.hasher.compare(answer,user.answer)
        if(!validateAnswer)throw new Error("validate Answer Error!")
        const {token,cryptoToken} = CodeFactory.generateRandomCode()
        this.tokenRepository.registerResetCode(cryptoToken,user.userID)
        return token
    }
    public async getSecurityQuestion(email:string){
        const user = await this.userRepository.getUser(email)
        const {token, cryptoToken} = CodeFactory.generateRandomCode()
        this.tokenRepository.registerChalengeID(cryptoToken,email)
        return {ask:(user as {ask:string}).ask,chalenge_id:token}
    }
}