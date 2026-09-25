import { describe, it, beforeEach, expect } from "@jest/globals";
import { LoginUseCase } from "./LoginUseCase";
import { IAuthRepository } from "./IAuthRepository";

const correctEmail = "correct@email.com"
const correctPassword = "Correct"

const wrongEmail = "wrong@email.com"

let usecase:LoginUseCase
const repository:IAuthRepository = {
    isValid: function (email: string, password: string):Promise<{isValid:boolean,data:{userID:string}|undefined}> {
        const validPair = email==correctEmail && password == correctPassword
        if(validPair) return Promise.resolve({isValid:true,data:{userID:"01"}})
        return Promise.resolve({isValid:false,data:undefined})
    }
}

process.env.SECRET_KEY = "Secret_Test"

describe('Login Use Cases tests',()=>{
    beforeEach(()=>{
        usecase = new LoginUseCase(repository)
    })
    describe("Correct path",()=>{
        it("user pass correct email-password",async()=>{
            const result = await usecase.exec(correctEmail,correctPassword)
            expect(result).toEqual({userID:"01",token:expect.any(String)})
        })
    })
    describe("Miss match",()=>{
        it("Wrong email",async ()=>{
            const result = await usecase.exec(wrongEmail,correctPassword)
            expect(result).toEqual({error:400,message:"Usuário não autorizado"})
        })
    })
})