import React from "react"
import selectArrow from "../../../../../../../images/selectarrow.png"

const defaultStyle: React.CSSProperties = {
  appearance: "none", 
  WebkitAppearance: "none", 
  MozAppearance: "none", 
  backgroundImage: `url(${selectArrow})`, 
  backgroundSize: "15px",
  backgroundRepeat: "no-repeat", 
  backgroundPosition: "right 12px center", 
  width: "100%", 
  padding: "6px 10px", 
  border: "1px solid black", 
  borderRadius: "10px", 
  fontSize: "1rem"
}

export const selectColors = [
    {id:"whitw", text: "Branco", emoji: "⚪" },
    {id:"yellow", text: "Amarelo", emoji: "🟡" },
    {id:"orange", text: "Laranja", emoji: "🟠" },
    {id:"#F00", text: "Vermelho", emoji: "🔴" },
    {id:"#0F0", text: "Verde", emoji: "🟢" },
    {id:"#00F", text: "Azul", emoji: "🔵" },
    {id:"rgba(255,0,255,1)", text: "Roxo", emoji: "🟣" },
] as const;

export type GroupColor = {id:string, text:string,emoji:string};

export function Select({value, onChange, children, name, style}:{value: string|number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children?: React.ReactNode, name?: string, style?: React.CSSProperties}){
  return(<select 
    name={name}
    value={value}
    onChange={onChange}
    required
    style={{
        ...defaultStyle,
        ...style
      }}
    >
      {children}
    </select>
  )
}