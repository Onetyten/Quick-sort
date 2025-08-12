import { Provider } from "react-redux"
import FileSelector from "./component/fileSelector"
import FolderOption from "./component/folderOption"
import NavBar from "./component/navBar"
import SortButton from "./component/sortButton"
import {store,persitor} from "../store"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persitor}>
        <main className="bg-foreground text-background font-jetbrains w-full min-h-screen">
          <NavBar/>
          <div className="w-full flex items-center justify-center">
            <div className="w-md flex my-36 flex-col gap-4 h-full items-center justify-center">
              <FileSelector/>
              <FolderOption/>
              <SortButton/>
            </div>
          </div>
        </main>
      </PersistGate>

    </Provider>
    
  )
}

export default App