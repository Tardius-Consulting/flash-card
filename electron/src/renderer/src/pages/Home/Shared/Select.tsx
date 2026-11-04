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

export function Select({children, style, value, onChange, name, required}:{children?: React.ReactNode, style?: React.CSSProperties, value?: string, onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void, name?: string, required?: boolean}){
  return(<select 
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    style={{
        ...defaultStyle,
        ...style
      }}
    >
      {children}
    </select>
  )
}