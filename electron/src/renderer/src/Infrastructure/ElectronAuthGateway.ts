import type { IAuthGateway } from "./IAuthGateway.js";

export class ElectronAuthGateway implements IAuthGateway{
    constructor(){}
    async login(email: string, password: string) {
        await window.electronAPI.login(email,password)
    }

    async me(){
        return await window.electronAPI.me()
    }
}