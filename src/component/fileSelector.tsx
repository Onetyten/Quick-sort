import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { clearUrl, setUrl } from "../../state/folderUrlSlice";
import { Digital } from "react-activity";
import "react-activity/dist/library.css";
import { FaFolderPlus,FaFolderOpen } from "react-icons/fa6";



export default function FileSelector() {
    const dispatch  = useDispatch()
    const folderUrl = useSelector((state:RootState)=>state.folderUrl.folderUrl)
    const loading = useSelector((state:RootState)=>state.sortingState.loading)
    
    async function HandleSelectPath(){
      const folderPath = await window.electronAPI.selectFolder()
      if (folderPath) {
        dispatch(setUrl(folderPath))
      }
      else {
        dispatch(clearUrl())
      }
    }


  return (
    <div>
        <div onClick={HandleSelectPath} className="border-2 dark:border-primary relative flex flex-col justify-center w-sm sm:w-md items-center rounded-xl overflow-hidden">
            <div className="text-[300px] p-6 text-background dark:text-primary">
              {folderUrl && folderUrl.trim().length>0?<FaFolderOpen/>:<FaFolderPlus/>}
            </div>
        
            <div className="bg-black dark:bg-primary dark:text-tokyo-background w-full p-4 text-center text-white ">
                <p>
                {folderUrl && folderUrl.trim().length>0?folderUrl:"Click to select a folder"}
                </p>
            </div>
            {loading&&(
              <div className="w-full flex justify-center items-center h-full text-primary bg-gray-400/40 absolute">
                <Digital size={50}/>
              </div>
            )}
            
        </div>

    </div>
  )
}
