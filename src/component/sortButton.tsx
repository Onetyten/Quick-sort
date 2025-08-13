import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { toast } from "react-toastify"

export default function SortButton() {
  const folderUrl = useSelector((state:RootState)=>state.folderUrl.folderUrl)
  const groupOptions = useSelector((state:RootState)=>state.groupOption.groupOptions)
  const optionIndex = useSelector((state:RootState)=>state.groupOption.optionIndex)
  const cleanName = useSelector((state:RootState)=>state.cleanName.cleanName)


  async function HandleSort() {
    if (!folderUrl || folderUrl.trim().length===0) return toast.warn("No folder selected")
    const status = await window.electronAPI.sortFolder(folderUrl,groupOptions,optionIndex,cleanName)
    console.log("renderer status",status)  
  }

  return (
        <button onClick={HandleSort} className={`${folderUrl && folderUrl.trim().length>0?"bg-background hover:bg-gray-800 text-foreground":"bg-foreground hover:bg-primary text-background border-2 "}  select-none cursor-pointer  p-3 px-10 rounded-md`}>
            Quick sort
        </button>
  )
}
