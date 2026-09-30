import { TokenFactory } from "../model/TokenFactory";
import { IAuthRepository } from "../repositories/IAuthRepository";

export class InitSessionUseCase{
    constructor(private repository:IAuthRepository){}
    public async execute(refresh:string){
        let result = await this.repository.validateRefreshCode(refresh) as {userID:string}
        if(!result) throw new Error("update error refreshcode")
        let {userID,...data} = result
        const token = new TokenFactory().assemble(userID,data)
        return token;
    }
}