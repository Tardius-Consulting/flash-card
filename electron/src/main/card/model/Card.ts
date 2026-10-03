export class Card{
    private constructor(
        private _id: string, 
        private _ask: string, 
        private _answer: string,
        private _groupID: string
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
    public static hydrate(id: string, ask: string, answer: string, groupID: string): Card{
        return new Card(id, ask, answer, groupID);
    }
}