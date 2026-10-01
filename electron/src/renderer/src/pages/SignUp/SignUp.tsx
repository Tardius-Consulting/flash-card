import React, { ChangeEvent, useState } from "react"

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

    const onSubmit=(e: React.SubmitEvent)=>{
        e.preventDefault();
        if(email!='' && password!='' && password==password2)
            continueRegister({email,password})
    }

    return<form onSubmit={onSubmit} style={{
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
            <button type="submit" id="Confirmation" className="action button">
                Entrar
            </button>
        </form>
}