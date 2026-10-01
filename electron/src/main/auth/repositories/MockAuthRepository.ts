import { CodeFactory } from "../model/CodeFactory.js";
import { User } from "../model/User.js";
import type { IAuthRepository } from "../repositories/IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    private autorizationCode:{[key : string]:unknown};
    private refreshCode:{[key:string]:unknown};
    private users:{[key:string]:{userID:string,password:string}}={"teste@teste.com":{userID:"teste_id",password:"$argon2id$v=19$m=65536,p=4,t=3$JwJnesxCYmuBEEiJckqiVA$eJMsE0dnQxJUOu7xsXaX5A03Yi2Okd/hcMOeZVgOPt0"}};

    async getUser(email: string) {
        const data = this.users[email]
        if(data)return data
    }
    async registerUser(user: User): Promise<void> {
        const {email,id,...data} = user.toState()
        this.users[email] = {userID:id,...data}
    }
    async registerAutorizationCode(code: string,data:unknown): Promise<void> {
        this.autorizationCode = {[code]:data};
    }
    async validateAutorizationCode(code:string):Promise<unknown>{
        const key = CodeFactory.encryptCode(code)
        return this.autorizationCode[key]
    }
    async registerRefreshCode(code: string,data:unknown): Promise<void> {
        this.refreshCode = {[code]:data}
    }
    async validateRefreshCode(code: string): Promise<unknown> {
        const key = CodeFactory.encryptCode(code)
        return this.refreshCode[key]
    }
}