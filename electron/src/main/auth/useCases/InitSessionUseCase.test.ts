import { describe, expect, it, jest } from "@jest/globals";
import { InitSessionUseCase } from "./InitSessionUseCase";
import { IAuthRepository } from "../repositories/IAuthRepository";

const repository:IAuthRepository = {
    getUser: function (email: string, password: string): Promise<{ userID: string; } | null> {
        throw new Error("Function not implemented.");
    },
    registerAutorizationCode: function (code: string, data: unknown): Promise<void> {
        throw new Error("Function not implemented.");
    },
    validateAutorizationCode: function (code: string): Promise<unknown> {
        throw new Error("Function not implemented.");
    },
    registerRefreshCode: function (code: string, data: unknown): Promise<void> {
        throw new Error("Function not implemented.");
    },
    validateRefreshCode: jest.fn(async()=>{})
}
const initializer = new InitSessionUseCase(repository)

process.env.SECRET_KEY = "Test_key"

describe("Get refresh token and try initialize a session",()=>{
    describe("Initializing session correct process",()=>{
        it("Pass correct refresh token",async()=>{
            (repository.validateRefreshCode as jest.Mock).mockImplementationOnce(async()=>{
                return {userID:"mock_user"}
            })
            let token = await initializer.execute("mock_refresh")
            expect(token).toEqual(expect.any(String))
        })
    })
})