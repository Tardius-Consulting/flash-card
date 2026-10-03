import { CodeFactory } from "../model/CodeFactory";
import { ITokenRepository } from "./ITokenRepository"
import Store from "electron-store"

export class TokenRepository implements ITokenRepository{

    constructor(private store:Store){}

    async registerChalengeID(id: string,email:string){
        this.store.set("_Chalenge_ID",{[id]:email});
    }
    async validateChalengeID(id: string){
        return (this.store.get("_Chalenge_ID") as {id:string})[id];
    }
    async registerAutorizationCode(code: string,data:unknown): Promise<void> {
        this.store.set("_Autorization_Code",{[code]:data});
    }
    async validateAutorizationCode(code:string):Promise<unknown>{
        const key = CodeFactory.encryptCode(code)
        return this.store.get("_Autorization_Code")?.[key];
    }
    async registerRefreshCode(code: string,data:unknown): Promise<void> {
        this.store.set("_Refresh_Code",{[code]:data});
    }
    async validateRefreshCode(code: string): Promise<unknown> {
        return this.store.get("_Refresh_Code")?.[code];
    }

    async registerResetCode(code: string, userID: string): Promise<void> {
        this.store.set("_Reset_Code",{[code]:userID});
    }

    async validateResetCode(code: string) {
        return this.store.get("_Reset_Code")?.[code];
    }
}