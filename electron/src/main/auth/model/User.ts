export class User{
    private constructor(private _id:string,private _email:string,private _password:string){}
    public static create(email:string, password:string){
        const id = new Date().getTime().toString()
        return new User(id,email,password)
    }
    public toState(){
        return {
            id:this._id,
            email:this._email,
            password:this._password
        }
    }
}