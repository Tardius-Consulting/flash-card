import React, { useEffect } from "react"
import { useReviewContext } from "../../../../context/Review.context"

const displayStyle:React.CSSProperties = {
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      alignItems:"center"
}

export function FinishScreen(){
    const { finishProcess,list } = useReviewContext()
    useEffect(()=>{
        finishProcess()
    },[])
    
    const quantity = list.length
    const correct = list.filter((card) => card.status).length

    const result = Math.floor(correct/quantity * 100)

    return<div style={{
      ...displayStyle,
      flex:1,
      padding:"20px 15px"
    }}>
        <h3>Fim do processo de revisão</h3>
        <p>Você revisou {quantity} cartões</p>
        <div style={{
          ...displayStyle,
          width:"80%",
          borderRadius:"10%",
          padding:"20px 10px",
          backgroundColor:"#777"
        }}>
          <p>Você acertou</p>
          <div style={{
            ...displayStyle,
            width:"50%",
            aspectRatio:1,
            borderRadius:"50%",
            backgroundColor: result>=50?"#0F0":"#F00",
            justifyContent:"center"
          }}>
            <p>{result}%</p>
          </div>
        </div>
    </div>
}