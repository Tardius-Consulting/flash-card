export type boxType = 1|2|3|4
export interface Review{
    id: string;
    status:boolean|null;
    box:boxType;
    ask: string;
    answer: string;
}