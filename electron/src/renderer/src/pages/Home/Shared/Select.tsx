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

export enum GroupColor {
  Laranja = "laranja",
  Azul = "azul",
  Roxo = "roxo",
  Amarelo = "amarelo",
  Vermelho = "vermelho",
  Verde = "verde",
  Branco = "branco"
}
export const selectColors = {
    branco: { text: "Branco", emoji: "⚪" },
    amarelo: { text: "Amarelo", emoji: "🟡" },
    laranja: { text: "Laranja", emoji: "🟠" },
    vermelho: { text: "Vermelho", emoji: "🔴" },
    verde: { text: "Verde", emoji: "🟢" },
    azul: { text: "Azul", emoji: "🔵" },
    roxo: { text: "Roxo", emoji: "🟣" },
} as const;


export function Select({value, onChange, children, name, style}:{value: GroupColor, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children?: React.ReactNode, name?: string, style?: React.CSSProperties}){
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