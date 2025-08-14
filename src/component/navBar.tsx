
// import LogoImg from '/images/Quick sort.webp'
import { LuLogs } from "react-icons/lu";
import { CgDarkMode } from "react-icons/cg";
import { Tooltip } from "react-tooltip"

interface propType{
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
    showSideBar:boolean
}

export default function NavBar(props:propType) {
    const {setShowSideBar,showSideBar} = props
    function handleNavBar(){
        setShowSideBar(!showSideBar)
    }
  return (
    <div className="w-full shadow-md h-16 p-2 flex bg-foreground justify-between items-center ">
        <div className='flex items-center gap-2'>
           
        </div>
        <div className='flex gap-4'>
            <div onClick={handleNavBar} data-tooltip-id='history' data-tooltip-content='History' className='p-1.5 border-2  hover:bg-primary rounded-md'>
                <LuLogs size={25} />
                <Tooltip id='history' className="z-50"/>
            </div>
            <div data-tooltip-id='darkmode' data-tooltip-content='Darkmode' data-tooltip-place='bottom' className='p-1.5 border-2  hover:bg-primary rounded-md'>
                <CgDarkMode size={25}/>
                 <Tooltip id='darkmode' className="z-50"/>
            </div>
        </div>
       
    </div>
  )
}
