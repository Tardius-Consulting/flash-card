import { User } from "../model/User"

export interface IAuthRepository{
    getUser(email:string):Promise<{userID:string,password:string}|null>
    registerUser(user:User):Promise<void>
    registerAutorizationCode(code:string,data:unknown):Promise<void>
    validateAutorizationCode(code:string):Promise<unknown>
    registerRefreshCode(code:string,data:unknown):Promise<void>
    validateRefreshCode(code:string):Promise<unknown>
}