export interface ITokenRepository{
    registerAutorizationCode(code:string,data:unknown):Promise<void>
    validateAutorizationCode(code:string):Promise<unknown>
    registerRefreshCode(code:string,data:unknown):Promise<void>
    validateRefreshCode(code:string):Promise<unknown>
    registerChalengeID(id:string,email:string):Promise<void>
    validateChalengeID(id:string):Promise<string>
    registerResetCode(code:string,userID:string):Promise<void>
    validateResetCode(code:string):Promise<string>
}