import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { toast } from "react-fox-toast"
import { useDispatch } from "react-redux"
import { addLog } from "../../state/logSlice"
import { setNotSorting, setSorting } from "../../state/sortingStateSlice"
import { clearUrl } from "../../state/folderUrlSlice"

export default function SortButton() {
  const dispatch = useDispatch()
  const history = useSelector((state:RootState)=>state.history.history)
  const folderUrl = useSelector((state:RootState)=>state.folderUrl.folderUrl)
  const groupOptions = useSelector((state:RootState)=>state.groupOption.groupOptions)
  const optionIndex = useSelector((state:RootState)=>state.groupOption.optionIndex)
  const cleanName = useSelector((state:RootState)=>state.cleanName.cleanName)

  async function HandleSort() {
    if (!folderUrl || folderUrl.trim().length===0) return toast.warning('No folder selected',{className:'rounded-none font-jetbrains border-2', position:'top-center'})
    try {
      dispatch(setSorting()) 
      const status = await window.electronAPI.sortFolder(folderUrl,groupOptions,optionIndex,cleanName)
      dispatch(addLog(status))
      toast(status.name,{className:'border-2', position:'top-center'})
      console.log("History",history) 
    }
    catch (error) {
      console.log(error)
    }
    finally
    {
      dispatch(setNotSorting())
      dispatch(clearUrl())
    }
   
  }

  return (
        <button onClick={HandleSort} className={`${folderUrl && folderUrl.trim().length>0?"bg-background hover:bg-gray-800 text-foreground":"bg-foreground hover:bg-primary text-background border-2 "}  select-none cursor-pointer  p-3 px-10 rounded-md`}>
            Quick sort
        </button>
  )
}

