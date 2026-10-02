import { CodeFactory } from "../model/CodeFactory";
import { PasswordHasher } from "../model/IPassWordHash";
import { IAuthRepository } from "../repositories/IAuthRepository";

export class ChangePasswordUseCase{
    constructor(private repository:IAuthRepository,private hasher:PasswordHasher){}
    public async change(password,token){
        const hash_token = CodeFactory.encryptCode(token)
        const userID = await this.repository.validateResetCode(hash_token)
        const hash_password = await this.hasher.hash(password)
        await this.repository.changePassword(userID,hash_password)
    }
    public async validateAnswer(answer:string,chalenge_id:string){
        const crypto = CodeFactory.encryptCode(chalenge_id)
        const email = await this.repository.validateChalengeID(crypto)
        const user = (await this.repository.getUser(email)) as {answer:string,userID:string}
        const validateAnswer = await this.hasher.compare(answer,user.answer)
        if(!validateAnswer)throw new Error("validate Answer Error!")
        const {token,cryptoToken} = CodeFactory.generateRandomCode()
        this.repository.registerResetCode(cryptoToken,user.userID)
        return token
    }
    public async getSecurityQuestion(email:string){
        const user = await this.repository.getUser(email)
        const {token, cryptoToken} = CodeFactory.generateRandomCode()
        this.repository.registerChalengeID(cryptoToken,email)
        return {ask:(user as {ask:string}).ask,chalenge_id:token}
    }
}