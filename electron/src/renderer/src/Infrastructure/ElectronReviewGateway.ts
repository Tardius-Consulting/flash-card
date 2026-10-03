import { ReviewState } from "./IReviewRepository";

export class ElectronReviewGateway{
    constructor(){}
    public async registerReview(value:ReviewState[]){
        
    }
    public async loadReview(groupID:string):Promise<ReviewState[]>{
        console.log("Carregando revisão do grupo: "+groupID)
        return [
            {
                "id": "1",
                "status": null,
                "ask": "O que é inteligência artificial?",
                "answer": "É a capacidade de máquinas simularem a inteligência humana para resolver problemas e tomar decisões."
            },
            {
                "id": "2",
                "status": null,
                "ask": "Qual é a capital do Brasil?",
                "answer": "Brasília."
            },
            {
                "id": "3",
                "status": null,
                "ask": "Quantos continentes existem no mundo?",
                "answer": "Existem 6 continentes de acordo com o modelo mais utilizado no Brasil (África, América, Antártica, Ásia, Europa e Oceania)."
            },
            {
                "id": "4",
                "status": null,
                "ask": "O que significa a sigla HTML?",
                "answer": "HyperText Markup Language (Linguagem de Marcação de Hipertexto)."
            },
            {
                "id": "5",
                "status": null,
                "ask": "Quem escreveu Dom Casmurro?",
                "answer": "Machado de Assis."
            }
        ]
    }
}