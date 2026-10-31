import React from "react"
import { ChangeEvent, useState } from "react"
import { ActionButton } from "../../Home/Shared/Button"

export function GetAsk({getAsk}:{getAsk:(email:string)=>Promise<void>}){

    const [email,setEmail] = useState('')
    const onChangeEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setEmail(value)
    }

    const onSubmit = ()=>getAsk(email)

    return <form style={{
        display:"flex",
        flexDirection:"column",
        width:"300px"
    }}>
        <label htmlFor="EmailField">Email</label>
        <input
            type="email"
            placeholder="Email"
            id="EmailField"
            value={email}
            onChange={onChangeEmail}
        />
        <ActionButton text="Entrar" onClick={onSubmit}/>
    </form>
}