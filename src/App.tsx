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

  return (
    <Provider store={store}>
      <PersistGate persistor={persitor}>
        <main className="bg-foreground text-background font-jetbrains w-full min-h-screen flex flex-col">
          <NavBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />

          {showSideBar && (
            <div className="border-b border-gray-500">
              <History setShowSideBar={setShowSideBar} />
            </div>
          )}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-md flex my-6 flex-col gap-4 h-full items-center justify-center">
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