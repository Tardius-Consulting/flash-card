export class ISOData {
    constructor(private value: string) {}

    public static currentDate(): ISOData {
        return new ISOData(new Date().toISOString());
    }

    public static nextDate(days:number): ISOData {
        const date = new Date();
        date.setDate(date.getDate() + days);

        return new ISOData(date.toISOString());
    }

    public toString(): string {
        return this.value;
    }

    public static fromString(value: string): ISOData {
        return new ISOData(value);
    }
}