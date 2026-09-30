import { describe, expect, it, jest } from "@jest/globals";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { AuthCallBackUseCase } from "./AuthCallBackUseCase";

const repository:IAuthRepository ={
    getUser: function (email: string, password: string): Promise<{ userID: string; } | null> {
        throw new Error("Function not implemented.");
    },
    registerAutorizationCode: function (code: string, data: unknown): Promise<void> {
        throw new Error("Function not implemented.");
    },
    validateAutorizationCode: jest.fn(async()=>{}),
    registerRefreshCode: jest.fn(async()=>{}),
    validateRefreshCode: function (code: string): Promise<unknown> {
        throw new Error("Function not implemented.");
    }
}
const generator = new AuthCallBackUseCase(repository)

describe("Get autorization code end try generate refresh token",()=>{
    describe("Correct process to generate refresh token",()=>{
        it("get autorization code and generate refresh token",async()=>{
            (repository.validateAutorizationCode as jest.Mock).mockImplementationOnce(async()=>{
                return{userID:"Mock_test"}
            })
            const code = "Test_code"
            const token = await generator.execute(code)
            expect(token).toEqual(expect.any(String))
            expect(repository.registerRefreshCode).toHaveBeenCalledWith(expect.not.stringMatching(code),{userID:"Mock_test"})
        })
    })
})