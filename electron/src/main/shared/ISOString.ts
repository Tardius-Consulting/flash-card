export class ISOString {
    private _value: string;
    public constructor(value: Date) {
        this._value = value.toISOString().substring(0,10);
    }
    public get date(): string {
        return this._value;
    }
}