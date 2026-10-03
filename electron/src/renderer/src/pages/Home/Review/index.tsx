import { useEffect, useState } from "react"
import { useReviewContext } from "../../../context/Review.context"
import { ReviewState } from "../../../Infrastructure/IReviewRepository"

export function ReviewScreem(){
    const { saveProcess, list, definedList } = useReviewContext()
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
        if(!definedList) return
        let index = 0
        console.log("Lista de revisão: ",list)
        while(index < list.length && list[index].status !== null){
            console.log("Pulando cartão ",index," pois possui status ",list[index].status)
            index++
        }
        if(index >= list.length){
            setCard(<FinishScreen/>)
            return
        }
        setCard(<Card index={index} handleNext={handleNext} card={list[index]}/>)
    },[definedList])
    return card
}

function Card({index,handleNext,card}:{index:number,handleNext:(index:number,status:boolean)=>void,card:ReviewState}){
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