
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { useDispatch } from "react-redux"
import { clearLog } from "../../state/logSlice"
import HistoryItem from "./historyItem"
import { toast } from "react-fox-toast"

interface propType{
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
}


export default function History(props:propType) {
    const dispatch = useDispatch()
    const {setShowSideBar} = props
    const history = useSelector((state:RootState)=>state.history.history)


    function clearHistory(){
        if (history.length==0){
            toast("History is empty",{className:'border-2', position:'top-center'})
        }
        else{
            toast("History cleared",{className:'border-2', position:'top-center'})
        }
        dispatch(clearLog())
    }
    
  return (
    <div className="fixed top-0 z-10 h-screen left-0 right-0 bottom-0 flex justify-end backdrop-blur-lg" >
        <div className="flex-1" onClick={()=>{setShowSideBar(false)}}>

        </div>
        <div className="h-full flex-3 sm:flex-2 lg:flex-1  border-l-2 bg-foreground overflow-y-scroll show-scrollbar ">
            <div className="flex justify-between p-4 items-center shadow-md h-16">
                <div>
                    
                </div>
                <div>
                    History
                </div>
                <div onClick={clearHistory} className="border-2 p-2 px-4 select-none rounded-md hover:bg-primary cursor-pointer">
                    Clear
                </div>
            </div>


            <div className="w-full flex-col items-center">
                {history.map((item,index)=>{
                return(
                    <div key={index}>
                        <HistoryItem item={item}/>
                    </div>

                )
                })}

            </div>
        </div>
    </div>
  )
}
