import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { IReviewRepository } from "../../Infrastructure/IReviewRepository"

export default function HomeScreem({reviewRepository}:{reviewRepository:IReviewRepository}){
    const [pendingReview,setPendingReview] = React.useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const loadState = async()=>{
            const state = await reviewRepository.validateState()
            setPendingReview(state)
        }
        loadState()
    },[])
    return<>
    {pendingReview &&
        <button onClick={()=>navigate('/Review/')}>Continuar revisão</button>
    }
    <button onClick={()=>navigate('/Review/teste_id')}>testar revisão</button>
    </>
}