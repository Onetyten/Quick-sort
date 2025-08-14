
// import LogoImg from '/images/Quick sort.webp'
import { LuLogs } from "react-icons/lu";
import { CgDarkMode } from "react-icons/cg";
import { Tooltip } from "react-tooltip"

interface propType{
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
    showSideBar:boolean
    setDarkmode: React.Dispatch<React.SetStateAction<boolean>>
    darkmode:boolean
}

export default function NavBar(props:propType) {
    const {setShowSideBar,showSideBar,setDarkmode,darkmode} = props
    function handleNavBar(){
        setShowSideBar(!showSideBar)
    }
    function handleDarkMode(){
        setDarkmode(!darkmode)
    }

  return (
    <div className="w-full shadow-md h-16 p-2 dark:bg-tokyo-background flex bg-foreground justify-between items-center ">
        <div className='flex items-center gap-2'>
           
        </div>
        <div className='flex gap-4'>
            <div onClick={handleNavBar} data-tooltip-id='history' data-tooltip-content='History' className='p-1.5 border-2 dark:border-primary dark:text-primary hover:bg-primary dark:hover:text-tokyo-background rounded-md'>
                <LuLogs size={25} />
                <Tooltip id='history' className="z-50"/>
            </div>
            <div onClick={handleDarkMode} data-tooltip-id='darkmode' data-tooltip-content='Darkmode' data-tooltip-place='bottom' className='p-1.5 border-2 dark:border-primary dark:text-primary hover:bg-primary dark:hover:text-tokyo-background rounded-md'>
                <CgDarkMode size={25}/>
                 <Tooltip id='darkmode' className="z-50"/>
            </div>
        </div>
       
    </div>
  )
}
