import { describe, it, beforeEach, expect, jest } from "@jest/globals";
import { LoginUseCase } from "./LoginUseCase";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { UserNotFoundException } from "./Errors/Exceptions";
import { PasswordHasher } from "../model/IPassWordHash";

const correctEmail = "correct@email.com"
const correctPassword = "Correct"

const wrongEmail = "wrong@email.com"

let usecase:LoginUseCase
const repository:IAuthRepository = {
    getUser: jest.fn( async(email: string) =>{
        const validPair = email==correctEmail
        if(validPair) return {userID:"01",password:correctPassword}
    }),
    registerUser:jest.fn()as any,
    registerAutorizationCode:jest.fn() as any,
    validateAutorizationCode:async()=>{return false},
    registerRefreshCode:async()=>{},
    validateRefreshCode:async()=>{return false}
}

jest.mock("../model/CodeFactory",()=>({
    CodeFactory:{
        generateRandomCode:jest.fn(()=>{
            return {token:"codigo de validação"}
        })
    }
}))

const hasher:PasswordHasher = {
    hash: jest.fn(async()=>{})as any,
    compare: jest.fn(async()=>true)
}

process.env.SECRET_KEY = "Secret_Test"

describe('Login Use Cases tests',()=>{
    beforeEach(()=>{
        usecase = new LoginUseCase(repository,hasher)
    })
    describe("Correct path",()=>{
        it("user pass correct email-password",async()=>{
            const result = await usecase.exec(correctEmail,correctPassword)
            expect(result).toEqual("codigo de validação")
        })
    })
    describe("Miss match",()=>{
        it("Wrong email",async ()=>{
            expect(usecase.exec(wrongEmail,correctPassword)).rejects.toThrow(UserNotFoundException)
        })
    })
})