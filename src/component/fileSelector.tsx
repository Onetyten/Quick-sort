import { useSelector } from "react-redux";
import FolderImg from "/images/folder.png"
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { clearUrl, setUrl } from "../../state/folderUrlSlice";
import AddFolderImg from "/images/addfolder.png"
import { Digital } from "react-activity";
import "react-activity/dist/library.css";



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
        <div onClick={HandleSelectPath} className="border-2 relative flex flex-col justify-center w-md items-center rounded-xl overflow-hidden">
            
            <img src={folderUrl && folderUrl.trim().length>0?FolderImg:AddFolderImg} className="object-contain select-none w-80 p-4 " alt="" />
            <div className="bg-black w-full p-4 text-center text-white ">
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
