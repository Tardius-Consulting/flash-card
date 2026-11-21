import React from "react"
import Modal from "./Modal"
import { Input } from "./Input"
import { GroupColor, Select, selectColors } from "./Select"
import { ActionButton, FallBackButton } from "./Button"

export function Group({onCancel, onAction, nomeGrupo, handleNomeGrupoChange, color, handleColorChange, actionButtonText}:{onCancel: ()=> void, onAction: ()=> void, nomeGrupo: string, handleNomeGrupoChange: (e: React.ChangeEvent<HTMLInputElement>) => void, color: GroupColor, handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, actionButtonText: string}){
  return(
    <Modal onExit={onCancel}>
        <div style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", width: "100%", height: "100%", padding: "0px 20px"}}>
            <form>
                <div>
                    <label style={{display: "block", padding: "5px 0px"}} htmlFor="GroupName">Nome do grupo:</label>
                    <Input type="text" name="groupname" value={nomeGrupo} onChange={handleNomeGrupoChange} minLength={1} placeholder="Nome do grupo.."/>
                </div>
                <div>
                    <label style={{display: "block", padding: "10px 0px"}} htmlFor="GroupColor">Cor do grupo:</label>
                    <Select name="groupcolor" value={color} onChange={handleColorChange}>
                        {Object.entries(selectColors).map(([key, { text, emoji }]) => (
                            <option key={key} value={key}>{emoji} {text}</option>
                        ))}
                    </Select>
                </div>
                <div style={{display: "flex", flexFlow: "row nowrap", justifyContent: "flex-end", gap: "5px"}}>
                    <FallBackButton text="Voltar" onClick={onCancel}/>
                    <ActionButton text={actionButtonText} onClick={onAction}/>
                </div>
            </form>
        </div>
    </Modal>
  )
}