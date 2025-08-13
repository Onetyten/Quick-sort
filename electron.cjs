const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs/promises");
const isDev = require("electron-is-dev");
const electronReload = require("electron-reload");

electronReload(__dirname);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startUrl = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => (mainWindow = null));
}

// select folder
ipcMain.handle('select-folder',async()=>{
    const result = await dialog.showOpenDialog({
        properties:['openDirectory']
    })
    if (!result.canceled){
        return result.filePaths[0]
    }
    return null
})

// general sort manager
async function HandleSort(event, folderUrl, groupOptions, optionIndex, cleanName) {
    console.log("Main process logs", folderUrl, groupOptions, optionIndex, cleanName);
    const selectedGrouping = groupOptions[optionIndex].value
    let result;
    switch (selectedGrouping) {
        case "date":
            result = await GroupByDate(folderUrl);
            break;
        case "name":
            result = await GroupByName(folderUrl);
            break;
        case "size":
            result = await GroupBySize(folderUrl);
            break;
        default:
            result = await GroupByType(folderUrl);
    }
    return result;
}

async function GroupByType(folderUrl) {
        try {
            const files = await fs.readdir(folderUrl)
            for (const file of files){
                const oldPath = path.join(folderUrl,file)
                // ignore folder
                const stat = await fs.stat(oldPath)
                if (!stat.isFile()){
                    continue
                }
                const fileExt = path.extname(file)
                const folderName =fileExt?`${fileExt.substring(1)} Folder`:"no extension Folder"
                const newFolderPath = path.join(folderUrl,folderName)
                try {
                    await fs.access(newFolderPath)
                }
                catch (error) {
                    await fs.mkdir(newFolderPath, { recursive: true });
                } 
                const newPath = path.join(newFolderPath,file)
                await fs.rename(oldPath,newPath)
                console.log("Group by type",folderUrl)
            }
            return "Grouped by files"
        }
        catch (error) {
            console.error("Error during GroupByType:", error);
            return `Error: ${error.message}`;
        }
}




async function GroupByDate(folderUrl) {
        try {
            const files = await fs.readdir(folderUrl)
            for (const file of files){
                const oldPath = path.join(folderUrl,file)
                // ignore folder
                const stat = await fs.stat(oldPath)
                if (!stat.isFile()){
                    continue
                }
                console.log(file,stat.birthtime)
                // const fileExt = path.extname(file)
                // const folderName =fileExt?`${fileExt.substring(1)} Folder`:"no extension Folder"
                // const newFolderPath = path.join(folderUrl,folderName)
                // try {
                //     await fs.access(newFolderPath)
                // }
                // catch (error) {
                //     await fs.mkdir(newFolderPath, { recursive: true });
                // } 
                // const newPath = path.join(newFolderPath,file)
                // await fs.rename(oldPath,newPath)
                // console.log("Group by type",folderUrl)
            }
            return "Grouped by date"
        }
        catch (error) {
            console.error("Error during GroupByDate:", error);
            return `Error: ${error.message}`;
        }
}

async function GroupByName(folderUrl) {
    console.log("Group by name",folderUrl)
    return "Group by name"
}

async function GroupBySize(folderUrl) {
    console.log("Group by size",folderUrl)
    return "Group by size"
}





ipcMain.handle("sort-folder", HandleSort); // <-- no parentheses here!


app.on('ready',createWindow)

app.on('window-all-closed',()=>{
    if (process.platform != 'darwin'){
        app.quit()
    }
})
app.on('activate',()=>{
    if (mainWindow==null){
        createWindow()
    }
})
