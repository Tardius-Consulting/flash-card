import { Card } from "../../card/model/Card";

export function shuffleCards(array: Card[]): Card[] {
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