import React from "react";
export default function Index({children, onExit}:{children:React.ReactNode,onExit:()=>void}){
  return<div 
    style={{
      width:"100vw",
      height:"100vh", 
      backgroundColor:"#00000077",
      position:"fixed",
      top:0,
      left:0,
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}
    onClick={onExit}
  >
    <div style={{
      display:"flex",
      width:"70%", 
      height:"70%",
      backgroundColor:"#FFF",
      border:"1px solid #00000099", 
      borderRadius:25,
      padding:"15px 10px"
    }}>
      {children}
    </div>
  </div>
}