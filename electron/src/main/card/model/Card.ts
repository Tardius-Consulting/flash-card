import { boxType } from "./Review";

export class Card{
    private constructor(
        private _id: string, 
        private _ask: string, 
        private _answer: string,
        private _groupID: string,
        private _box: boxType
    ){}
    public get id(): string{
        return this._id;
    }
    public get ask(): string{
        return this._ask;
    }
    public get answer(): string{
        return this._answer;
    }
    public get box(): boxType{
        return this._box;
    }
    public static hydrate(id: string, ask: string, answer: string, groupID: string, box: boxType): Card{
        return new Card(id, ask, answer, groupID, box);
    }
}