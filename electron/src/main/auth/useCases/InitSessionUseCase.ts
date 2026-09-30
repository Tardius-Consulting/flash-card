import { TokenFactory } from "../model/TokenFactory";
import { IAuthRepository } from "../repositories/IAuthRepository";

export class InitSessionUseCase{
    constructor(private repository:IAuthRepository){}
    public async execute(refresh:string){
        const result = await this.repository.validateRefreshCode(refresh) as {userID:string}
        if(!result) throw new Error("update error refreshcode")
        const {userID,...data} = result
        const token = new TokenFactory().assemble(userID,data)
        return token;
    }
}