import type{ IAuthGateway } from "./IAuthGateway.js";

export class MockAuthGateway implements IAuthGateway{
    constructor(){}
    async login(email: string, password: string) {
        console.log(`mock gateway login com email:${email} e password:${password}`)
    }
    async me(){}
}