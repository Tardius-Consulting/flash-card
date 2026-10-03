import { CardDTO } from "../../../types/card.dto";
import { Card } from "../../card/model/Card";

export class ReviewList {
    private constructor(private _cards: Card[]) {}

    private shuffleCards(array: Card[]): Card[] {
        // Cria uma cópia para não modificar a lista original
        const shuffled = [...array];
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            // Escolhe um índice aleatório entre 0 e i, onde i é o ultimo incice que pode ser alterado
            const j = Math.floor(Math.random() * (i + 1));
            
            // inclui um ítem aleatório [j] na ultima posição da lista [i]
            // continuando o processo até que todos os itens tenham sido embaralhados
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }

    public static async create(promiseCards: Promise<Card[]>): Promise<ReviewList> {
        const cards = await promiseCards;
        return new ReviewList(cards);
    }

    public get cards(): CardDTO[] {
        this._cards = this.shuffleCards(this._cards);
        return this.toState;
    }

    public get toState(): CardDTO[] {
        return this._cards.map((card) => ({
            id: card.id,
            status: null,
            box:card.box,
            ask: card.ask,
            answer: card.answer
        }));
    }
}