import React from "react"

const defaultStyle: React.CSSProperties = {
  width: "100%",
  padding: "2px 10px",
  border: "1px solid black",
  borderRadius: "10px",
  fontSize: "1rem"
}

export function Input({style, value, onChange, name, type, placeholder, minLength}:{style?: React.CSSProperties, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name?: string, type: React.HTMLInputTypeAttribute, placeholder?: string, minLength?: number}){
  return(<input 
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    minLength={minLength}
    onChange={onChange}
    required
    style={{
        ...defaultStyle,
        ...style
      }}
    >
    </input>
  )
}