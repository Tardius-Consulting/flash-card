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

    async getAsk(email: string): Promise<string> {
        return await window.electronAPI.getAsk(email)
    }

    async validateAnswer(answer: string): Promise<boolean> {
        return await window.electronAPI.validateAnswer(answer)
    }

    async submitPasswordChange(password: string): Promise<{ ok: boolean; message: string; }> {
        return await window.electronAPI.submitPasswordChange(password)
    }
}