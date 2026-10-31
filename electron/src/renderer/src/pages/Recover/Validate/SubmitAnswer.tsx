import React from "react"
import { ChangeEvent, useState } from "react"
import { ActionButton } from "../../Home/Shared/Button"

export function SubmitAnswer({submitAnswer,ask}:{ask:string,submitAnswer:(answer:string)=>Promise<void>}){

    const [answer,setAnswer] = useState('')
    const onChangeAnswer=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setAnswer(value)
    }

    const onSubmit = ()=>submitAnswer(answer)

    return <form style={{
        display:"flex",
        flexDirection:"column",
        width:"300px"
    }}>
        <label>Pergunta: {ask}</label>
        <label htmlFor="EmailField">Resposta</label>
        <input
            type="email"
            placeholder="Email"
            id="EmailField"
            value={answer}
            onChange={onChangeAnswer}
        />
        <ActionButton text="Entrar" onClick={onSubmit}/>
    </form>
}