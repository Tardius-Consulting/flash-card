export interface IAuthRepository{
    getUser(email:string,password:string):Promise<{userID:string}|null>
}