import React, { useState } from "react"
import { IAuthGateway } from "../../Infrastructure/IAuthGateway"
import { useNavigate } from "react-router"
import InitiRegister from "./SignUp"
import AskRegister from "./AskRegister"

export default function SignUp({gateway}:{gateway:IAuthGateway}){
    const [data, setData] = useState({
        email:"",
        password:""
    })

    const [first,setFirst] = useState(true)

    const navigate = useNavigate()

    const onSubmit=async(submit:{ask:string,answer:string})=>{
        try{
            const result = await gateway.register({...data,...submit})
            if(!result.ok)
                throw result
            navigate("/")
        }catch(err){
            if(err instanceof Error)
            console.log(err.message)
        }
    }

    const onClick=()=>{
        navigate("/Login")
    }
    
    const onPassFirst = (data:{email:string,password:string})=>{
        setData(prev=>({
            ...prev,
            email:data.email,
            password:data.password
        }))
        setFirst(false)
    }
    
    return<div className="">
        {first?
            <InitiRegister continueRegister={onPassFirst}/>
            :
            <AskRegister continueRegister={onSubmit} returnForm={()=>setFirst(true)}/>
        }
        <a onClick={onClick} className="button">
            Já tenho um perfil
        </a>
    </div>
}