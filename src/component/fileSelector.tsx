import FolderImg from "/images/folder.png"
// import AddFolderImg from "/images/addfolder.png"

function HandleSelectPath(){
  console.log("file selected")
}


export default function FileSelector() {
  return (
    <div>
        <label htmlFor="folder-path" className="border-2  flex flex-col justify-center w-md items-center rounded-xl overflow-hidden">
            <img src={FolderImg} className="object-contain select-none w-80 p-4 " alt="" />
            <div className="bg-black w-full p-4 text-center text-white ">
                <p>
                Select or drag in a folder
                </p>
            </div>
        </label>
        <input
          type="file"
          multiple
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          webkitdirectory=""
          directory=""
          id="folder-path"
          className="hidden"
          onChange={HandleSelectPath}
        />
    </div>
  )
}
