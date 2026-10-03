import React, { useEffect } from "react"
import { useReviewContext } from "../../../context/Review.context"

export function FinishScreen(){
    const { finishProcess,list } = useReviewContext()
    useEffect(()=>{
        finishProcess()
    },[])
    
    const quantity = list.length
    const correct = list.filter((card) => card.status).length

    return<div>
        <h3>Fim do processo de revisão</h3>
        <p>Você revisou {quantity} cartões</p>
        <p>Você acertou {Math.round(correct/quantity * 100)}% dos cartões</p>
    </div>
}