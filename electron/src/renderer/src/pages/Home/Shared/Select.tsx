import React from "react"

const defaultStyle: React.CSSProperties = {
  appearance: "none", 
  WebkitAppearance: "none", 
  MozAppearance: "none", 
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23333' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, 
  backgroundRepeat: "no-repeat", 
  backgroundPosition: "right 6px center", 
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