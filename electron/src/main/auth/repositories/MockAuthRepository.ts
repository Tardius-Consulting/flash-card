import type { IAuthRepository } from "../repositories/IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    private autorizationCode:string;
    async getUser(email: string, password: string): Promise<{ userID: string; } | null> {
        console.log(`mock auth repository com email:${email} senha:${password}`)
        return Promise.resolve({userID:"31051645"});
    }
    async registerAutorizationCode(code: string): Promise<void> {
        this.autorizationCode = code;
    }
    async getAutorizationCode():Promise<string>{
        return this.autorizationCode
    }
}