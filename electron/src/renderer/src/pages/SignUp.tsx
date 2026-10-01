import React, { ChangeEvent, useState } from "react"
import { IAuthGateway } from "../Infrastructure/IAuthGateway"
import { useNavigate } from "react-router"

export default function SignUp({gateway}:{gateway:IAuthGateway}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate()
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

    const onSubmit=async()=>{
        try{
            if(password==password2)
                await gateway.register(email,password)
        }catch(err){
            if(err instanceof Error)
            console.log(err.message)
        }
    }

    const onClick=()=>{
        navigate("/Login")
    }
    return<div className="">
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
            <input 
                placeholder="Senha" 
                type="password"
                id="PasswordField"
                onChange={onChangePassword2}
            />
            <button type="submit" id="Confirmation" className="action button">
                Entrar
            </button>
        </form>
        <a onClick={onClick} className="button">
            Já tenho um perfil
        </a>
    </div>
}