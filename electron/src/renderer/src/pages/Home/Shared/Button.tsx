import React from "react"

export function ActionButton({onClick,text,style}:{onClick:()=>void,text:string,style?:React.CSSProperties}){
  return<button 
    onClick={onClick}
    style={
      {
        minWidth:"100px",
        height:"50px",
        backgroundColor:"#1B5",
        color:"#FFF",
        borderRadius:10,
        border:"0px",
        ...style
      }
    }
  >
    <p>{text}</p>
  </button>
}

export function FallBackButton({onClick,text,style}:{onClick:()=>void,text:string,style?:React.CSSProperties}){
  return<button 
    onClick={onClick}
    style={
      {
        minWidth:"100px",
        height:"50px",
        backgroundColor:"#FFF",
        color:"#1B5",
        borderRadius:10,
        border:"0px",
        ...style
      }
    }
  >
    <p>{text}</p>
  </button>
}