import { CodeFactory } from "../model/CodeFactory";
import { ITokenFactory } from "../model/TokenFactory";
import { IAuthRepository } from "../repositories/IAuthRepository";

export class InitSessionUseCase{
    constructor(private repository:IAuthRepository,private factory:ITokenFactory){}
    public async execute(refresh:string){
        const encryptCode = CodeFactory.encryptCode(refresh)
        const result = await this.repository.validateRefreshCode(encryptCode) as {userID:string}
        if(!result) throw new Error("update error refreshcode")
        const {userID,...data} = result
        const token = this.factory.assemble(userID,data)
        return token;
    }
}