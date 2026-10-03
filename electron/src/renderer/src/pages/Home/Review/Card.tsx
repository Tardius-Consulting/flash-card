import React, { useState } from "react"
import { ReviewState } from "../../../Infrastructure/IReviewRepository"

export function Card({index,handleNext,card}:{index:number,handleNext:(index:number,status:boolean)=>void,card:ReviewState}){
    const [showQuestion,setShowQuestion] = useState(true)
    
    return<div style={{
        display:"flex", 
        flexDirection:"column", 
        gap:"1rem"
    }} onClick={(e)=>{
        e.stopPropagation()
        setShowQuestion(false)
    }}>
        <div>
            <h3>{showQuestion ? "Pergunta" : "Resposta "+(index+1)}</h3>
        </div>
        <div>
            <p>{showQuestion ? card.ask : card.answer}</p>
        </div>
        {showQuestion ? 
            <p>Clique para ver a resposta</p>
            :
            <>
                <button onClick={(e)=>{
                    e.stopPropagation()
                    e.preventDefault()
                    handleNext(index,true)
                    setShowQuestion(true)
                }}>Acertei</button>
                <button onClick={(e)=>{
                    e.stopPropagation()
                    e.preventDefault()
                    handleNext(index,false)
                    setShowQuestion(true)
                }}>Errei</button>
            </>
        }
    </div>
}