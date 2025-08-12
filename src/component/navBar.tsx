
import LogoImg from '/images/Quick sort.webp'
import { LuLogs } from "react-icons/lu";
import { CgDarkMode } from "react-icons/cg";
import { Tooltip } from "react-tooltip"


export default function NavBar() {
  return (
    <div className="w-full border-b-[1px] border-background p-2 flex justify-between items-center ">
        <div className='flex items-center gap-2'>
            <img src={LogoImg} className='object-contain w-12 h-12'/>
        </div>
        <div className='flex gap-4'>
            <div data-tooltip-id='history' data-tooltip-content='History' className='p-1.5 border-2 rounded-md'>
                <LuLogs size={25} />
                <Tooltip id='history'/>
            </div>
            <div data-tooltip-id='darkmode' data-tooltip-content='Darkmode' data-tooltip-place='bottom' className='p-1.5 border-2 rounded-md'>
                <CgDarkMode size={25}/>
                 <Tooltip id='darkmode'/>
            </div>
        </div>
       
    </div>
  )
}
