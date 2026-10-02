import React from "react"
import { ChangeEvent, useState } from "react"

export function GetAsk({getAsk}:{getAsk:(email:string)=>Promise<void>}){

    const [email,setEmail] = useState('')
    const onChangeEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setEmail(value)
    }

    return <form onSubmit={()=>getAsk(email)} style={{
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
        <button type="submit" id="Confirmation" className="action button">
            Entrar
        </button>
    </form>
}