import React from "react"
import { useNavigate } from "react-router"

export default function HomeScreem(){
    const navigate = useNavigate()
    return<>
    <button onClick={()=>navigate('/Review/teste_id')}>testar revisão</button>
    </>
}