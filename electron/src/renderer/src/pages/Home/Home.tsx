import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { IReviewRepository } from "../../Infrastructure/IReviewRepository"
import { ActionButton } from "./Shared/Button"
import ReviewModal from "./Shared/Modal"
import { ReviewScreem } from "./Group/Review"

export default function HomeScreem({reviewRepository}:{reviewRepository:IReviewRepository}){
    const [pendingReview,setPendingReview] = React.useState(false)
    const [ review, setReview ] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        const loadState = async()=>{
            const state = await reviewRepository.validateState()
            setPendingReview(state)
        }
        loadState()
    },[])
    return<>
    {review && <ReviewModal onExit={()=>setReview(false)}>
        <ReviewScreem reviewRepository={reviewRepository}/>
      </ReviewModal>}
    {pendingReview &&
        <button onClick={()=>navigate('/Review/')}>Continuar revisão</button>
    }
    <ActionButton onClick={()=>setReview(true)} text="testar revisão"/>
    </>
}