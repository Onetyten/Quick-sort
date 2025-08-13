import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs'
import isDev from 'electron-is-dev'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload:path.join(__dirname,'preload.js'),
        },
    })
    const startUrl = isDev? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`
    mainWindow.loadURL(startUrl)
    mainWindow.on('closed',()=>(mainWindow==null))
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
    const fileExtensionArr = []
    console.log("Group by type",folderUrl)
    return "Group by type"
    
}

async function GroupByDate(folderUrl) {
    console.log("Group by date",folderUrl)
    return "Group by date"
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
