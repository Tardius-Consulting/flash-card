import { PasswordHasher } from "../model/IPassWordHash";
import { User } from "../model/User";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { IUserRepository } from "../repositories/IUserRepository";

export class RegisterUseCase{
    constructor(private repository:IUserRepository, private hasher:PasswordHasher){}
    public async execute(data:{email:string,password:string,ask:string,answer:string}){
        const hash_pass = await this.hasher.hash(data.password)
        const securityAsk = {ask:data.ask,answer:await this.hasher.hash(data.answer)}
        const user = User.create(data.email,hash_pass,securityAsk)
        this.repository.registerUser(user);
    }
}