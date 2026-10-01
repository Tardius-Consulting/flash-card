import type{ IAuthGateway } from "./IAuthGateway.js";

export class MockAuthGateway implements IAuthGateway{
    constructor(){}
    async register(data:{email:string,password:string,ask:string,answer:string}): Promise<{ ok: boolean; message: string; }> {
        console.log(data)
        return{ok:true,message:""}
    }
    
    async login(email: string, password: string) {
        console.log(email,password)
        return{ok:true,message:""}
    }

    async me(){
        return{ok:true,message:""}
    }
}