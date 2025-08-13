import { useSelector } from "react-redux"
import type { RootState } from "../../store"

export default function SortButton() {
  const folderUrl = useSelector((state:RootState)=>state.folderUrl.folderUrl)
  const groupOptions = useSelector((state:RootState)=>state.groupOption.groupOptions)
  const optionIndex = useSelector((state:RootState)=>state.groupOption.optionIndex)
  const cleanName = useSelector((state:RootState)=>state.cleanName.cleanName)


  async function HandleSort() {
    const status = await window.electronAPI.sortFolder(folderUrl,groupOptions,optionIndex,cleanName)
    console.log("renderer status",status)  
  }

  return (
        <button onClick={HandleSort} className={`${folderUrl && folderUrl.trim().length>0?"bg-background hover:bg-gray-800":"bg-gray-300 hover:bg-gray-400"}  select-none cursor-pointer  p-3 px-10 text-foreground rounded-md`}>
            Quick sort
        </button>
  )
}
