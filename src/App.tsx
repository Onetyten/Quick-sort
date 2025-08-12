import FolderOption from "./component/folderOption"
import NavBar from "./component/navBar"
import SortButton from "./component/sortButton"
// import AddFolderImg from "/images/addfolder.png"
import FolderImg from "/images/folder.png"

function App() {
  return (
    <div className="bg-foreground text-background font-jetbrains w-full min-h-screen">
      <NavBar/>
      <div className="w-full flex items-center justify-center">
        <div className="w-md flex my-36 flex-col gap-4 h-full items-center justify-center">
          <div className="border-2  flex flex-col justify-center w-md items-center rounded-xl overflow-hidden">
            <img src={FolderImg} className="object-contain w-80 p-4 " alt="" />
            <div className="bg-black w-full p-4 text-center text-white ">
              <p>
                Select or drag in a folder
              </p>
            </div>
          </div>
          {/* options */}
          <FolderOption/>
          <SortButton/>

        </div>



      </div>

    </div>
  )
}

export default App