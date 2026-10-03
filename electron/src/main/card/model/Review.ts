import { boxType } from "../../../types/card.dto";
import { ISOString } from "../../shared/ISOString";

export class Review{
    private constructor(private _id: string, private _box: boxType, private _due_date: ISOString){}
    public get id(){
        return this._id
    }
    public get box(){
        return this._box
    }
    public get due_date(){
        return this._due_date
    }
    public static hydrate(id: string, box:boxType, status:boolean): Review{
        const now = new Date();
        if(!status){
            now.setDate(now.getDate() + 2)
            return new Review(id, 1, new ISOString(now));
        }
        const newBox = box === 4 ? 4 : box + 1;
        now.setDate(now.getDate() + newBox*newBox)
        return new Review(id, newBox as boxType, new ISOString(now));
    }
}