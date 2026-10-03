import { useEffect, useState } from "react"
import { useReviewContext } from "../../../context/Review.context"
import { ReviewState } from "../../../Infrastructure/IReviewRepository"

export function ReviewScreem(){
    const { saveProcess, list } = useReviewContext()
    const [card,setCard] = useState(<></>)
    const handleNext = async(index:number,status:boolean)=>{
        await saveProcess(index,status)
        setCard(
            list[index+1] ? 
                <Card index={index+1} handleNext={handleNext} card={list[index+1]}/> 
                : 
                <FinishScreen/>
        )
    }
    useEffect(()=>{
        setCard(<Card index={0} handleNext={handleNext} card={list[0]}/>)
    },[])
    return card
}

function Card({index,handleNext,card}:{index:number,handleNext:(index:number,status:boolean)=>void,card:ReviewState}){
    const [showQuestion,setShowQuestion] = useState(true)
    if(showQuestion)
    return<div style={{
        display:"flex", 
        flexDirection:"column", 
        gap:"1rem"
    }} onClick={()=>setShowQuestion(false)}>
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
                <button onClick={()=>handleNext(index,true)}>Acertei</button>
                <button onClick={()=>handleNext(index,false)}>Errei</button>
            </>
        }
    </div>
}

function FinishScreen(){
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