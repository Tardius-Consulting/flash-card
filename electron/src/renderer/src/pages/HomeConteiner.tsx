import { Outlet } from "react-router";
import React, { useEffect, useState } from "react"
import { useApp } from "../context/app.context";

export default function HomeConteiner(){
  const { me } = useApp()
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const validator = async ()=>{
      await me()
      setLoading(false)
    }
    validator()
  },[])

  if(loading) return(<div>
    <p>loading</p>
  </div>)
  return <>
    <Outlet/>
  </>
}