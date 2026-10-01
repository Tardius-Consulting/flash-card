import { ITokenFactory } from "../model/TokenFactory"

export class validateJWTUseCase{
    constructor(private factory:ITokenFactory){}
    public execute(jwt?:string){
        if(!jwt)throw new Error("Validate error JWT validator")
        const payload = this.factory.verificarJWT(jwt)
        return payload
    }
}