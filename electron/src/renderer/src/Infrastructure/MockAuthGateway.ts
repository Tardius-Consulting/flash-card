import type{ IAuthGateway } from "./IAuthGateway.js";

export class MockAuthGateway implements IAuthGateway{
    constructor(){}
    login(email: string, password: string): Promise<any> {
        console.log(`mock gateway login com email:${email} e password:${password}`)
        return Promise.resolve()
    }
}