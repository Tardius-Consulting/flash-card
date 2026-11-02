import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"
import { Select } from "./Shared/Select"
import { Input } from "./Shared/Input"

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
            <div style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", width: "100%", height: "100%", padding: "0px 20px"}}>
                <form>
                    <div className="Field">
                        <label style={{display: "block", padding: "5px 0px"}} htmlFor="GroupName">Nome do grupo:</label>
                        <Input type="text" name="groupname" value={editNomeGrupo} onChange={handleNomeGrupoChange} minLength={1} placeholder="Nome do grupo.." required/>
                    </div>
                    <div className="Field">
                        <label style={{display: "block", padding: "10px 0px"}} htmlFor="GroupColor">Cor do grupo:</label>
                        <Select name="groupcolor" value={editColor} onChange={handleColorChange} required>
                            <option value="laranja">&#x1F7E0; Laranja</option>
                            <option value="azul">&#x1F535; Azul</option>
                            <option value="roxo">&#x1F7E3; Roxo</option>
                        </Select>
                    </div>
                    <div style={{display: "flex", flexFlow: "row nowrap", justifyContent: "flex-end", gap: "5px"}}>
                        <FallBackButton text="Voltar" onClick={onCancel}/>
                        <ActionButton text="Criar grupo" onClick={onAction}/>
                    </div>
                </form>
            </div>
        </Modal>
    )
}