import { type ChangeEvent, useState } from "react"
import React from "react"
import type{ IAuthGateway } from "./Infrastructure/IAuthGateway.js"

export default function Login({gateway}:{gateway:IAuthGateway}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onChangeEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setEmail(value)
    }
    const onChangePassword=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setPassword(value)
    }

    const onSubmit=()=>{
        try{
            gateway.login(email,password)
        }catch(err){
            if(err instanceof Error)
            console.log(err.message)
        }
    }

    const onClick=()=>{

    }
    return <div className="">
        <form onSubmit={onSubmit} style={{
            display:"flex",
            flexDirection:"column",
            width:"300px"
        }}>
            <label htmlFor="EmailField">Email</label>
            <input 
                type="email" 
                placeholder="Email" 
                id="EmailField" 
                onChange={onChangeEmail}
            />
            <label htmlFor="PasswordField" style={{marginTop:"10px"}}>Senha</label>
            <input 
                placeholder="Senha" 
                type="password"
                id="PasswordField"
                onChange={onChangePassword}
            />
            <button type="submit" id="Confirmation" className="action button">
                Entrar
            </button>
        </form>
        <a onClick={onClick} className="button">
            Criar perfil
        </a>
    </div>
}