import React from "react"

const defaultStyle = {
  minWidth:"100px",
  height:"30px",
  borderRadius:10,
  border:"1px solid",
  marginTop:"20px"
}
 
const colo1 = "#FFF"
const colo2 = "#000"

export function ActionButton({onClick,text,style}:{onClick:()=>void,text:string,style?:React.CSSProperties}){
  return(<button 
    onClick={onClick}
    style={
      {
        ...defaultStyle,
        backgroundColor:colo2,
        color:colo1,
        ...style
      }
    }
  >
    <p>{text}</p>
  </button>)
}

export function FallBackButton({onClick,text,style}:{onClick:()=>void,text:string,style?:React.CSSProperties}){
  return(<button 
    onClick={onClick}
    style={
      {
        ...defaultStyle,
        backgroundColor:colo1,
        color:colo2,
        borderColor:colo2,
        ...style
      }
    }
  >
    <p>{text}</p>
  </button>)
}