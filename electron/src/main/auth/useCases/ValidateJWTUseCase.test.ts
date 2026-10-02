import { describe, expect, it } from "@jest/globals";
import { TokenFactory } from "../model/TokenFactory";
import { validateJWTUseCase } from "./ValidateJWTUseCase";

const factory = new TokenFactory()
const useCase = new validateJWTUseCase(factory)

process.env.SECRET_KEY = "teste_key"

describe("",()=>{
    it("",()=>{
        const JWT = factory.assemble("teste_id")
        const validate = useCase.execute(JWT)
        expect(validate).toEqual({
            exp:expect.any(Number),
            iat:expect.any(Number),
            meta:undefined,
            sub:"teste_id"
        })
    })
    it("",()=>{
        const JWT = factory.assemble("teste_id",{name:"teste1",role:"teste2"})
        const validate = useCase.execute(JWT)
        expect(validate).toEqual({
            exp:expect.any(Number),
            iat:expect.any(Number),
            meta:{
                name:"teste1",
                role:"teste2"
            },
            sub:"teste_id"
        })
    })
})