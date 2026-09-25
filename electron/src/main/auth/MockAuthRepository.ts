import type { IAuthRepository } from "./IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    async isValid(email: string, password: string): Promise<{ isValid: boolean; data: { userID: string; } | undefined; }> {
        console.log(`mock auth repository com email:${email} senha:${password}`)
        return Promise.resolve({isValid:true,data:{userID:"31051645"}});
    }
}