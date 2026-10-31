import React, { ChangeEvent, useState } from "react"
import { ActionButton } from "../Home/Shared/Button"

export default function InitiRegister({continueRegister}:{continueRegister:(data:{email:string,password:string})=>void}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const onChangeEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setEmail(value)
    }

    const onChangePassword=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setPassword(value)
    }

    const onChangePassword2=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setPassword2(value)
    }

    const onSubmit=()=>{
        if(email!='' && password!='' && password==password2)
            continueRegister({email,password})
    }

    return<form style={{
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
            <label htmlFor="PasswordField" style={{marginTop:"10px"}}>Senha</label>
            <input 
                placeholder="Senha" 
                type="password"
                id="PasswordField"
                value={password}
                onChange={onChangePassword}
            />
            <input 
                placeholder="Senha" 
                type="password"
                id="PasswordField"
                value={password2}
                onChange={onChangePassword2}
            />
            <ActionButton text="Entrar" onClick={onSubmit}/>
        </form>
}