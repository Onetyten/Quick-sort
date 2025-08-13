const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload script loaded");
contextBridge.exposeInMainWorld("electronAPI",{
    selectFolder:()=>ipcRenderer.invoke("select-folder"),
    sortFolder:(folderUrl,groupOptions,optionIndex,cleanName)=>ipcRenderer.invoke("sort-folder",folderUrl,groupOptions,optionIndex,cleanName)
})