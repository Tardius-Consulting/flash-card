export class User{
    private constructor(
        private _id:string,
        private _email:string,
        private _password:string,
        private _securityAsk:{ask:string,answer:string}){}
    public static create(email:string, password:string,securityAsk:{ask:string,answer:string}){
        const id = new Date().getTime().toString()
        return new User(id,email,password,securityAsk)
    }
    public toState(){
        return {
            id:this._id,
            email:this._email,
            password:this._password,
            ask:this._securityAsk.ask,
            answer:this._securityAsk.answer
        }
    }
}