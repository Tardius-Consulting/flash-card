import React, { ChangeEvent, useState } from "react"

export default function AskRegister({continueRegister,returnForm}:{continueRegister:(data:{ask:string,answer:string})=>void,returnForm:()=>void}){
    const [ask, setAsk] = useState('')
    const [answer, setAnswer] = useState('')

    const onChangeAsk=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setAsk(value)
    }

    const onChangeAnswer=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setAnswer(value)
    }

    const onSubmit=(e: React.SubmitEvent)=>{
        e.preventDefault();
        if(ask!='' && answer!='')
            continueRegister({ask,answer})
    }

    return<form onSubmit={onSubmit} style={{
            display:"flex",
            flexDirection:"column",
            width:"300px"
        }}>
            <div style={{display:"flex",flexDirection:"row"}}>
                <p onClick={returnForm}>&lt;</p>
                <h3>
                    Pergunta de segurança
                </h3>
            </div>
            <label htmlFor="EmailField">Email</label>
            <input 
                type="text" 
                placeholder="Pergunta" 
                id="AskField" 
                onChange={onChangeAsk}
            />
            <label htmlFor="PasswordField" style={{marginTop:"10px"}}>Senha</label>
            <input 
                placeholder="Resposta" 
                type="text"
                id="AnswerField"
                onChange={onChangeAnswer}
            />
            <button type="submit" id="Confirmation" className="action button">
                Entrar
            </button>
        </form>
}