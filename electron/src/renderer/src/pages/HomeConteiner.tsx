import { Outlet } from "react-router";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { IAuthGateway } from "../Infrastructure/IAuthGateway";

export default function HomeConteiner({gateway}:{gateway:IAuthGateway}){
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const validator = async ()=>{
      try{
        const result = await gateway.me()
        setLoading(false)
        if(!result) navigate('/Login')
      }catch(err){
        console.log(err.message)
        navigate('/Login')
      }
    }
    validator()
  },[])

  if(loading) return(<div>
    <p>loading</p>
  </div>)
  return <>
    <Outlet/>
  </>
}