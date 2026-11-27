
import { ActionButton } from "../pages/Home/Shared/Button"
import ReviewModal from "../pages/Home/Shared/Modal"
import { ReviewScreem } from "../pages/Home/Group/Review"
import { useEffect, useState } from "react"
export default function Index({reviewRepository}){
    const [pendingReview,setPendingReview] = useState(false)
    const [ review, setReview ] = useState(false);
    useEffect(()=>{
        const loadState = async()=>{
            const state = await reviewRepository.validateState()
            setPendingReview(state)
        }
        loadState()
    },[])
  return(<>
      {
        review 
        && 
        <ReviewModal onExit={()=>setReview(false)}>
          <ReviewScreem reviewRepository={reviewRepository}/>
        </ReviewModal>
      }
    {pendingReview &&
        <button onClick={()=>setReview(true)}>Continuar revisão</button>
    }
    <ActionButton onClick={()=>setReview(true)} text="testar revisão"/>
  </>)
}