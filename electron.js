import { app, BrowserWindow } from 'electron';
import path from 'path';
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
            nodeIntegration:true,
        },
    })
    const startUrl = isDev? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`
    mainWindow.loadURL(startUrl)
    mainWindow.on('closed',()=>(mainWindow==null))


}

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
