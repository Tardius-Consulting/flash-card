import type { IAuthGateway } from "./IAuthGateway.js";

export class ElectronAuthGateway implements IAuthGateway{
    constructor(){}
    async login(email: string, password: string) {
        return await window.electronAPI.login(email,password)
    }

    async me(){
        return await window.electronAPI.me()
    }

    async register(data:{email:string,password:string,ask:string,answer:string}) {
        return await window.electronAPI.register(data)
    }
}