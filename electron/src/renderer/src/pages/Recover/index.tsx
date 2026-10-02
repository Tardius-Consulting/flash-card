import { useNavigate } from "react-router"
import { IAuthGateway } from "../../Infrastructure/IAuthGateway"
import { useState } from "react"
import { ValidateConteiner } from "./Validate"
import { RecoverPassword } from "./RecoverPassword"
import React from "react"

export function RecoverConteiner({gateway}:{gateway:IAuthGateway}){
    const navigate = useNavigate()
    const [changePassword,setChangePassword] = useState(false)
    const submitChange = async (password:string)=>{
        const result = await gateway.submitPasswordChange(password)
        if(result.ok)navigate("/Login")
    }
    return <div className="">
        {!changePassword?
            <ValidateConteiner setValidated={(result:boolean)=>setChangePassword(result)} gateway={gateway}/>
            :
            <RecoverPassword submitChange={submitChange}/>
        }
        <a onClick={()=>navigate("/SignUp")} className="button">
            Criar perfil
        </a>
    </div>
}