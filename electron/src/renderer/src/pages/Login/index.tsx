import { type ChangeEvent, useState } from "react"
import React from "react"
import type{ IAuthGateway } from "../../Infrastructure/IAuthGateway.js"
import { useNavigate } from "react-router"
import { ActionButton, FallBackButton } from "../Home/Shared/Button.js"

export default function Login({gateway}:{gateway:IAuthGateway}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const onChangeEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setEmail(value)
    }
    const onChangePassword=(e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setPassword(value)
    }

    const onSubmit=async()=>{
        try{
            const result = await gateway.login(email,password)
            if(!result.ok)throw new Error(result.message)
            navigate("/")
        }catch(err){
            if(err instanceof Error)
            console.log(err.message)
        }
    }

    const onClick=()=>{
        navigate("/SignUp")
    }
    return <div className="">
        <form style={{
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
            <ActionButton text="Entrar" onClick={onSubmit}/>
        </form>
        <FallBackButton text="Criar perfil" onClick={onClick}/>
    </div>
}