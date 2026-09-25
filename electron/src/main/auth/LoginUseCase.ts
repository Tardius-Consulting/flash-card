import { IAuthRepository } from "./IAuthRepository";
import { TokenFactory } from "./TokenFactory";

export class LoginUseCase{
    constructor(private repository:IAuthRepository){}
    public async exec(email:string,password:string) {
        const result = await this.repository.isValid(email,password)
        if(!result.isValid)
        return{
            error:400,
            message:"Usuário não autorizado"
        }
        if(result.data){
            const token = new TokenFactory().assemble(result.data.userID)
            return {...result.data,token}
        }
        return {
            error:500,
            message:"Internal error, not found!"
        }
    }
}