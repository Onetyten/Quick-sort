import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { useDispatch } from "react-redux"
import { toggleClean } from "../../state/cleanupName"
import { IoMdArrowDropdown,IoMdArrowDropup  } from "react-icons/io";
import { useState } from "react";
import { setGroupIndex } from "../../state/groupOption";


export default function FolderOption() {
  const dispatch = useDispatch()
  const cleanUpName = useSelector((state:RootState)=>state.cleanName.cleanName)
  const groupOptions = useSelector((state:RootState)=>state.groupOption.groupOptions)
  const groupIndex = useSelector((state:RootState)=>state.groupOption.optionIndex)
  const [showOption,setShowOption] = useState(false)
  

  function ToggleCleanName(){
    dispatch(toggleClean())
    console.log(cleanUpName)
  }

  return (
    <div className="flex justify-between w-full gap-2" >
        {/* sort by */}
        
          <div className="w-full cursor-pointer flex relative justify-center items-center p-3 rounded-md text-center border-2 text-background" onClick={()=>{setShowOption(!showOption)}}>
            <OutsideClickHandler onOutsideClick={()=>{setShowOption(false)}}>
              <p className=" w-full flex select-none flex-col text-center h-full items-center justify-center">
                Group By {groupOptions[groupIndex].name}
              </p>
              <div className='absolute right-1 top-1/2 -translate-y-1/2'>
                {showOption?<IoMdArrowDropdown />:<IoMdArrowDropup />}
              </div>
              
              {showOption&&(
                
                  <div className="absolute  w-full bottom-14 shadow-md left-0 bg-fixed border-2 bg-foreground rounded-md flex flex-col ">
                    {groupOptions.map((item,index)=>{
                      return(
                        <p key={index} className="p-2 hover:bg-primary select-none" onClick={()=>{dispatch(setGroupIndex(index))}}>
                          {item.name}
                        </p>
                      )
                    })}

                  </div>
              )}
             </OutsideClickHandler>  
          </div>
       



        <div className={`w-full cursor-pointer select-none flex justify-center items-center p-3 rounded-md text-center border-2 ${cleanUpName?"text-background":" text-foreground bg-background"} `} onClick={()=>{ToggleCleanName()}}>
            Cleanup name
        </div>

            
    </div>
  )
}
