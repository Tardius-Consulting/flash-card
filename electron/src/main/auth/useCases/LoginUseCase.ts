import { IAuthRepository } from "../repositories/IAuthRepository";
import { TokenFactory } from "../model/TokenFactory";

export class LoginUseCase{
    constructor(private repository:IAuthRepository){}
    public async exec(email:string,password:string) {
        try{
            const result = await this.repository.getUser(email,password)
            if(!result)
            return{
                error:400,
                message:"Usuário não autorizado"
            }
            const token = new TokenFactory().assemble(result.userID)
            return {...result,token}
        }catch(err){
            return {
                error:500,
                message:"Internal error, not found!"
            }
        }
    }
}