import { describe, expect, it, jest } from "@jest/globals";
import { InitSessionUseCase } from "./InitSessionUseCase";
import { IAuthRepository } from "../repositories/IAuthRepository";

const repository:IAuthRepository = {
    getUser: jest.fn(async () => { }) as any,
    registerAutorizationCode: jest.fn(async () => { }) as any,
    validateAutorizationCode: jest.fn(async () => { }) as any,
    registerRefreshCode: jest.fn(async () => { }) as any,
    validateRefreshCode: jest.fn(async () => { }),
    registerUser: jest.fn(async()=>{})as any
}
const initializer = new InitSessionUseCase(repository)

process.env.SECRET_KEY = "Test_key"

describe("Get refresh token and try initialize a session",()=>{
    describe("Initializing session correct process",()=>{
        it("Pass correct refresh token",async()=>{
            (repository.validateRefreshCode as jest.Mock).mockImplementationOnce(async()=>{
                return {userID:"mock_user"}
            })
            const token = await initializer.execute("mock_refresh")
            expect(token).toEqual(expect.any(String))
        })
    })
})