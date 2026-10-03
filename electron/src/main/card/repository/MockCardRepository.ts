import { Card } from "../model/Card";
import { ICardRepository } from "./ICardRepository";
import { Review } from "../model/Review";
const cards = [
            {
                "userID": "teste_id",
                "id": "1",
                "groupID": "2",
                "box": 1,
                "ask": "O que é inteligência artificial?",
                "answer": "É a capacidade de máquinas simularem a inteligência humana para resolver problemas e tomar decisões."
            },
            {
                "userID": "teste_id",
                "id": "2",
                "box": 2,
                "groupID": "1",
                "ask": "Qual é a capital do Brasil?",
                "answer": "Brasília."
            },
            {
                "userID": "teste_id",
                "id": "3",
                "box": 3,
                "groupID": "1",
                "ask": "Quantos continentes existem no mundo?",
                "answer": "Existem 6 continentes de acordo com o modelo mais utilizado no Brasil (África, América, Antártica, Ásia, Europa e Oceania)."
            },
            {
                "userID": "teste_id",
                "id": "4",
                "box": 4,
                "groupID": "2",
                "ask": "O que significa a sigla HTML?",
                "answer": "HyperText Markup Language (Linguagem de Marcação de Hipertexto)."
            },
            {
                "userID": "teste_id",
                "id": "5",
                "box": 1,
                "groupID": "1",
                "ask": "Quem escreveu Dom Casmurro?",
                "answer": "Machado de Assis."
            }
        ]
export class MockCardRepository implements ICardRepository{
    public async getCardList(userID: string, groupID: string): Promise<Card[]> {
        const list = cards.filter(card => card.userID === userID && card.groupID === groupID);
        return list.map((card) => Card.hydrate(card.id, card.ask, card.answer, card.groupID, card.box as 1|2|3|4));
    }
    public async registerReview(userID: string, cards: Review[]): Promise<void> {
        console.log(`Registrando revisão para o usuário ${userID}:`, cards);
    }
}