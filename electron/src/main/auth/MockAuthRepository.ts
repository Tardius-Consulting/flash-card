import type { IAuthRepository } from "./IAuthRepository.js";

export class MockAuthRepository implements IAuthRepository{
    async isValid(email: string, password: string): Promise<{ isValid: boolean; data: { userID: string; } | undefined; }> {
        console.log("passou pelo repository")
        return Promise.resolve({isValid:true,data:{userID:"31051645"}});
    }
    
}