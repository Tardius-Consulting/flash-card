import React, { useEffect, useState } from "react"
import { useReviewContext } from "../../../context/Review.context"
import { FinishScreen } from "./FinishScreen"
import { Card } from "./Card"

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