import type { IAuthRepository } from "../repositories/IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    private autorizationCode:{[key : string]:unknown};
    private refreshCode:{[key:string]:unknown};
    async getUser(email: string, password: string): Promise<{ userID: string; } | null> {
        console.log(`mock auth repository com email:${email} senha:${password}`)
        return Promise.resolve({userID:"31051645"});
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
}