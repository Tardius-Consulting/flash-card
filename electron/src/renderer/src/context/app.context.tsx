import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { IAuthGateway } from "../Infrastructure/IAuthGateway";
import { useNavigate } from "react-router";

interface AppContextData{
    me:()=>Promise<void>
}

const appContext = createContext<AppContextData|null>(null)

export function AppProvider({children, gateway}:{children:ReactNode,gateway:IAuthGateway}){

    const navigate = useNavigate()

    useEffect(()=>{
        window.rendererAPI.onLogin(()=>{
            navigate("/")
        })
    },[])

    const me = async()=>{
      try{
        const result = await gateway.me()
        if(!result.ok) navigate('/Login')
      }catch(err){
        console.log(err.message)
        navigate('/Login')
      }
    }

    const value:AppContextData = {
        me
    }
    return<appContext.Provider value={value}>
        {children}
    </appContext.Provider>
}

export function useApp(){
    const context = useContext(appContext)
    if(!context)throw new Error("App Context error!")
    return context
}