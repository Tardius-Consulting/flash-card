import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"
import { GroupColor, Select, selectColors } from "./Shared/Select"
import { Input } from "./Shared/Input"

export default function Index({onCancel}:{onCancel:()=>void}){
    const [editNomeGrupo, setEditNomeGrupo] = React.useState<string>("")
    const [editColor, setEditColor] = React.useState<GroupColor>(GroupColor.Branco)

    const handleNomeGrupoChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEditNomeGrupo(e.target.value);
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setEditColor(e.target.value as GroupColor);
    }

    const onAction = ()=>{}

    return(
        <Modal onExit={onCancel}>
            <div style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", width: "100%", height: "100%", padding: "0px 20px"}}>
                <form>
                    <div>
                        <label style={{display: "block", padding: "5px 0px"}} htmlFor="GroupName">Nome do grupo:</label>
                        <Input type="text" name="groupname" value={editNomeGrupo} onChange={handleNomeGrupoChange} minLength={1} placeholder="Nome do grupo.."/>
                    </div>
                    <div>
                        <label style={{display: "block", padding: "10px 0px"}} htmlFor="GroupColor">Cor do grupo:</label>
                        <Select name="groupcolor" value={editColor} onChange={handleColorChange}>
                            {Object.entries(selectColors).map(([key, { text, emoji }]) => (
                                <option key={key} value={key}>{emoji} {text}</option>
                            ))}
                        </Select>
                    </div>
                    <div style={{display: "flex", flexFlow: "row nowrap", justifyContent: "flex-end", gap: "5px"}}>
                        <FallBackButton text="Voltar" onClick={onCancel}/>
                        <ActionButton text="Salvar" onClick={onAction}/>
                    </div>
                </form>
            </div>
        </Modal>
    )
}