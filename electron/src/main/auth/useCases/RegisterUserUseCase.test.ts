import { describe, expect, it, jest } from "@jest/globals";
import { RegisterUseCase } from "./RegisterUserUseCase";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { PasswordHasher } from "../model/IPassWordHash";

const repository:IAuthRepository={
    getUser: jest.fn() as any,
    registerUser: jest.fn(async()=>{}),
    registerAutorizationCode: jest.fn() as any,
    validateAutorizationCode: jest.fn() as any,
    registerRefreshCode: jest.fn() as any,
    validateRefreshCode: jest.fn() as any
}

const hasher:PasswordHasher={
    hash: jest.fn(async(password)=>{return "hash_"+password}),
    compare: jest.fn() as any
}

const register = new RegisterUseCase(repository,hasher)
describe("",()=>{
    it("",async()=>{
        await register.execute({email:"email",password:"senha",ask:"ask",answer:"answer"})
        expect(repository.registerUser).toHaveBeenCalledWith({
            _email:"email",
            _id:expect.any(String),
            _password:"hash_senha",
            _securityAsk:{
                ask:"ask",
                answer:"hash_answer"
            }
        }as any)
    })
})