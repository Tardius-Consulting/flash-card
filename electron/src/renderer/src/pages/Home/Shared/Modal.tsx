import React from "react";
export default function Index({children, onExit}:{children:React.ReactNode,onExit:()=>void}){
  return<div className="conteiner"
    style={{
      width:"100vw",
      height:"100vh", 
      backgroundColor:"#00000077",
      position:"fixed",
      top:0,
      left:0
    }}
    onClick={(e) => {
      if(e.target !== e.currentTarget) return
      onExit()
    }}
  >
    <div className="conteiner" onClick={(e) => e.stopPropagation()} style={{
      width:"70%", 
      height:"70%",
      backgroundColor:"#FFF",
      border:"1px solid #00000099", 
      borderRadius:10,
      padding:"20px 15px"
    }}>
      {children}
    </div>
  </div>
}