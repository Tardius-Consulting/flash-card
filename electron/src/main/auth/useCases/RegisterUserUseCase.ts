import { PasswordHasher } from "../model/IPassWordHash";
import { User } from "../model/User";
import { Argon2PasswordHash } from "../repositories/Argon2PasswordHash";
import { IAuthRepository } from "../repositories/IAuthRepository";

export class RegisterUseCase{
    constructor(private repository:IAuthRepository, private hasher:PasswordHasher){}
    public async execute(email:string,password:string){
        const hash_pass = await this.hasher.hash(password)
        const user = User.create(email,hash_pass)
        this.repository.registerUser(user);
    }
}