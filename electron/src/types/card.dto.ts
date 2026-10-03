export interface ConcludeReviewDTO{
    id:string
    status:boolean
    box:boxType
}
export type boxType = 1|2|3|4
export interface CardDTO{
    id: string;
    status:boolean|null;
    box:boxType;
    ask: string;
    answer: string;
}