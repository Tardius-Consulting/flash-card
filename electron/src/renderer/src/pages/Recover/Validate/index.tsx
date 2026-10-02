import React from "react"
import { IAuthGateway } from "../../../Infrastructure/IAuthGateway"
import { useState } from "react"
import { GetAsk } from "./GetAsk"
import { SubmitAnswer } from "./SubmitAnswer"

export function ValidateConteiner({gateway,setValidated}:{
    gateway:IAuthGateway,
    setValidated:React.Dispatch<React.SetStateAction<boolean>>
}){
    const [ask,setAsk] = useState('')
    const [showAsk,setShowAsk] = useState(false)
    const getAsk = async(email:string)=>{
        const result = await gateway.getAsk(email)
        setAsk(result)
        setShowAsk(true)
    }
    const submitAnswer = async(answer:string)=>{
        const result = await gateway.validateAnswer(answer)
        setValidated(result)
    }
    if(!showAsk)
    return <GetAsk getAsk={getAsk}/>
    return <SubmitAnswer ask={ask} submitAsk={submitAnswer}/>
}