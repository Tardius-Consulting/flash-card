import { IAuthGateway } from "./IAuthGateway";

export class MockAuthGateway implements IAuthGateway{
    constructor(){}
    login(email: string, password: string): Promise<any> {
        return Promise.resolve()
    }
}