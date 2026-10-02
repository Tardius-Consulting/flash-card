import React from "react"
import { ChangeEvent, useState } from "react"

export function SubmitAnswer({submitAsk,ask}:{ask:string,submitAsk:(answer:string)=>Promise<void>}){

    const [answer,setAnswer] = useState('')
    const onChangeAnswer=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setAnswer(value)
    }

    return <form onSubmit={()=>submitAsk(answer)} style={{
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
        <button type="submit" id="Confirmation" className="action button">
            Entrar
        </button>
    </form>
}