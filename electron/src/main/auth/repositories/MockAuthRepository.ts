import type { IAuthRepository } from "../repositories/IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    async getUser(email: string, password: string): Promise<{ userID: string; } | null> {
        console.log(`mock auth repository com email:${email} senha:${password}`)
        return Promise.resolve({userID:"31051645"});
    }
}