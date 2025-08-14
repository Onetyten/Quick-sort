import { Provider } from "react-redux"
import FileSelector from "./component/fileSelector"
import FolderOption from "./component/folderOption"
import NavBar from "./component/navBar"
import SortButton from "./component/sortButton"
import {store,persitor} from "../store"
import { PersistGate } from "redux-persist/integration/react"
import { ToastContainer} from 'react-fox-toast';
import History from "./component/history"
import { useState } from "react"

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate persistor={persitor}>
        <main className={`bg-foreground dark:bg-tokyo-background ${darkmode?"dark":""} text-background font-jetbrains w-full text-xs sm:text-base min-h-screen flex flex-col`}>
          <NavBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} darkmode={darkmode} setDarkmode={setDarkmode} />

          {showSideBar && (
            <div className="border-b border-gray-500">
              <History setShowSideBar={setShowSideBar} />
            </div>
          )}
          <div className="flex-1 my-10 flex items-center justify-center">
            <div className="w-sm sm:w-md flex my- flex-col gap-4 h-full items-center justify-center">
              <FileSelector />
              <FolderOption />
              <SortButton />
            </div>
          </div>

          <ToastContainer position="top-center" />
        </main>
      </PersistGate>
    </Provider>
  );
}


export default App