import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"

export default function Index({onCancel}:{onCancel:()=>void}){
    const [editNomeGrupo, setEditNomeGrupo] = React.useState<string>("")
    const [editColor, setEditColor] = React.useState<string>("")

    const handleNomeGrupoChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEditNomeGrupo(e.target.value);
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setEditColor(e.target.value);
    }

    const onAction = ()=>{}

    return(
        <Modal onExit={onCancel}>
            <div style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignContent: "center", width: "95%", margin: "auto", padding: "10px 25px 15px 25px", border: "2px solid #8b8b8b", borderRadius: "15px", backgroundColor: "#d7d7d7"}}>
                <form>
                    <div className="Field">
                        <label style={{display: "block", padding: "10px 0px", fontWeight: "700", fontSize: "20px", color: "#444444"}} htmlFor="GroupName">Nome do grupo:</label>
                        <input type="text" name="groupname" id="GroupName" value={editNomeGrupo} onChange={handleNomeGrupoChange} minLength={1} placeholder="Nome do grupo.." required style={{width: "100%", padding: "10px 10px", border: "3px solid #8b8b8b",borderRadius: "15px", fontSize: "22px", backgroundColor: "white", color: "#767676"}}/>
                    </div>
                    <div className="Field">
                        <label style={{display: "block", padding: "10px 0px", fontWeight: "700", fontSize: "20px", color: "#444444"}} htmlFor="GroupColor">Cor do grupo:</label>
                        <select name="groupcolor" id="GroupColor" value={editColor} onChange={handleColorChange} required style={{appearance: "none", WebkitAppearance: "none", MozAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23333' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", width: "100%", padding: "10px 10px", border: "3px solid #8b8b8b",borderRadius: "15px", fontSize: "22px", backgroundColor: "white", color: "#767676"}}>
                            <option value="laranja">Laranja</option>
                            <option value="azul">Azul</option>
                            <option value="roxo">Roxo</option>
                        </select>
                    </div>
                    <div>
                        <FallBackButton text="Voltar" onClick={onCancel}/>
                        <ActionButton text="Criar grupo" onClick={onAction}/>
                    </div>
                </form>
            </div>
        </Modal>
    )
}