import React from "react"
import { ChangeEvent, useState } from "react"

export function RecoverPassword({submitChange}:{submitChange:(password:string)=>void}){
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const onChangePassword=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setPassword(value)
    }

    const onChangePassword2=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setPassword2(value)
    }

    const onSubmit=(e: React.SubmitEvent)=>{
        e.preventDefault();
        if(password!='' && password==password2)
            submitChange(password)
    }

    return<form onSubmit={onSubmit} style={{
            display:"flex",
            flexDirection:"column",
            width:"300px"
        }}>
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
            <button type="submit" id="Confirmation" className="action button">
                Entrar
            </button>
        </form>
}