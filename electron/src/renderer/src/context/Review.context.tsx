import { createContext, useContext, useEffect, useState } from "react";
import { IReviewRepository, ReviewState } from "../Infrastructure/IReviewRepository";
import { ElectronReviewGateway } from "../Infrastructure/ElectronReviewGateway";
import { useParams } from "react-router";

interface ReviewInterface{
    saveProcess:(index:number, status:boolean)=>Promise<void>
    finishProcess:()=>Promise<void>
    list:ReviewState[]
    definedList:boolean
}

const ReviewContext = createContext<ReviewInterface|null>(null)

export function ReviewProvider({children,repository}:{children:React.ReactNode,repository:IReviewRepository}){

    const gateway = new ElectronReviewGateway()
    const [list,setList] = useState<ReviewState[]>()
    const [definedList,setDefinedList] = useState(false)
    const {groupID} = useParams()

    useEffect(()=>{
        const loadState = async()=>{
            let state = await repository.loadState()
            if(!state) {
                state = await gateway.loadReview(groupID)
                await repository.saveState(state)
            }
            setList(state)
            setDefinedList(true)
        }
        loadState()
    },[])

    const saveProcess = async (index:number, status:boolean)=>{
        const card = list[index]
        const updatedList = [...list]
        updatedList[index] = {...card, status}
        setList(updatedList)
        await repository.saveState(updatedList)
    }

    const finishProcess = async ()=>{
        const state = await repository.loadState()
        await gateway.registerReview(state)
        await repository.removeState();
    }
    const value:ReviewInterface = {
        saveProcess,
        finishProcess,
        list,
        definedList
    }
    return<ReviewContext.Provider value={value}>
        {children}
    </ReviewContext.Provider>
}

export function useReviewContext(){
    const context = useContext(ReviewContext)
    if(!context) throw new Error("Review Context must be used inside a Review Provider!")
    return context
}