import { getJWT } from ".."
import { TokenFactory } from "../auth/model/TokenFactory"
import { UnAutorizedException } from "../auth/useCases/Errors/Exceptions"

export const validateSession = async (f:(userID:string, meta:Record<string, unknown>)=>Promise<void>): Promise<void> => {
    const jwt = getJWT()
    if(!jwt){
        throw new UnAutorizedException()
    }
    const tokenFactory = new TokenFactory()
    const payload = tokenFactory.verificarJWT(jwt)
    if(!payload){
        throw new UnAutorizedException()
    }
    await f(payload.sub, payload.meta)
}