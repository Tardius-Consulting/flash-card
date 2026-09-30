import { User } from "../model/User.js";
import type { IAuthRepository } from "../repositories/IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    private autorizationCode:{[key : string]:unknown};
    private refreshCode:{[key:string]:unknown};
    private users:{[key:string]:{userID:string,password:string}}={"teste@teste":{userID:"teste_id",password:"teste"}};

    async getUser(email: string) {
        console.log(`mock auth repository com email:${email}`)
        const data = this.users[email]
        if(data)return data
    }
    async registerUser(user: User): Promise<void> {
        const {email,...data} = user.toState()
        this.users[email] = {userID:data.id,password:data.password}
    }
    async registerAutorizationCode(code: string,data:unknown): Promise<void> {
        this.autorizationCode = {[code]:data};
    }
    async validateAutorizationCode(code:string):Promise<unknown>{
        return this.autorizationCode[code]
    }
    async registerRefreshCode(code: string,data:unknown): Promise<void> {
        this.refreshCode = {[code]:data}
    }
    async validateRefreshCode(code: string): Promise<unknown> {
        return this.refreshCode[code]
    }
}