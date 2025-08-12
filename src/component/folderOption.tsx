

export default function FolderOption() {
  return (
    <div className="flex justify-between w-full gap-2" >
        {/* sort by */}
        <div className="w-full flex justify-center items-center p-3 rounded-md text-center border-2 text-background">
            <p className=" w-full flex flex-col text-center h-full items-center justify-center">
            Group By File Type
            </p>
        </div>
        
        <div className="w-full flex justify-center items-center p-3 rounded-md text-center border-2 text-background">
            Cleanup name
        </div>

            
    </div>
  )
}
