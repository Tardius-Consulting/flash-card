import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./pages/Login"
import { ElectronAuthGateway } from "./Infrastructure/ElectronAuthGateway"
import SignUp from "./pages/SignUp/Index"

const conteiner = document.getElementById("rootAuth")

if(!conteiner) throw new Error("root not found!")

const root = createRoot(conteiner)
const authGateway = new ElectronAuthGateway()
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/Login" element={<Login gateway={authGateway}/>}/>
            <Route path="/SignUp" element={<SignUp gateway={authGateway}/>}/>
        </Routes>
    </BrowserRouter>
)