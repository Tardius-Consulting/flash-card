import { User } from "../model/User"

export interface IUserRepository{
    getUser(email:string):Promise<unknown|null>
    registerUser(user:User):Promise<void>
    changePassword(userID:string,password:string):Promise<void>
}