import type { IAuthGateway } from "./IAuthGateway.js";

export class ElectronAuthGateway implements IAuthGateway{
    constructor(){}
    async login(email: string, password: string): Promise<any> {
        await window.electronAPI.login(email,password)
    }
}