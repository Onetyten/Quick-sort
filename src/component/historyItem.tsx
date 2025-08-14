import { useState } from "react";
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";

interface LogType {
    name: string;
    log: string[];
    foldersCreated: number;
}

interface propType{
    item:LogType
}


export default function HistoryItem(props:propType) {
    const {item} = props
    const [showLog,setShowLogs] = useState(false)
  return (
    <div className="w-full flex flex-col border-b-2">
        <div className="p-6 justify-between flex items-start gap-4">
            <div className="flex-1">
                <p>
                    {item.name} | {item.foldersCreated} folders created
                </p>
            </div>
            <div className="p-2 text-2xl" onClick={()=>{setShowLogs(!showLog)}}>
                {showLog?<IoMdArrowDropup/>:<IoMdArrowDropdown/>}
            </div>
        </div>
        {
            showLog&&(
            <div>
                {item.log.map((item,index)=>{
                    return(
                        <div key={index} className="w-full text-center hover:bg-primary bg-foreground p-4">
                            <p>{item}</p>
                        </div>
                    )
                })}
            </div>
            )
        }

    </div>
  )
}
