const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const path = require("path");
const fs = require("fs/promises");

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    title: 'Quicksort',
    icon: path.join(__dirname, "Quick sort.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Fixed path resolution for production
  const startUrl = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "dist/index.html")}`;
  
  mainWindow.loadURL(startUrl);
  Menu.setApplicationMenu(null);
  mainWindow.on("closed", () => (mainWindow = null));
}

// select folder
ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});

// general sort manager
async function HandleSort(event, folderUrl, groupOptions, optionIndex, cleanName) {
  const selectedGrouping = groupOptions[optionIndex].value;
  console.log("Grouping", folderUrl, "by", selectedGrouping);
  let log = [];
  let folderNum = 0;
  let name = `Grouped folder ${folderUrl} by ${selectedGrouping}`;
  let result = { name, log, foldersCreated: folderNum };

  if (cleanName) {
    result.log = await RemoveDuplicates(folderUrl, log);
  }
  switch (selectedGrouping) {
    case "date":
      result = await GroupByDate(folderUrl, result.log, result.foldersCreated, result.name);
      break;
    case "size":
      result = await GroupBySize(folderUrl, result.log, result.foldersCreated, result.name);
      break;
    case "type":
      result = await GroupByType(folderUrl, result.log, result.foldersCreated, result.name);
      break;
    default:
      break;
  }
  return result;
}

async function GroupByType(folderUrl, log, folderNum, name) {
  try {
    const files = await fs.readdir(folderUrl);
    for (const file of files) {
      const oldPath = path.join(folderUrl, file);
      // ignore folder
      const stat = await fs.stat(oldPath);
      if (!stat.isFile()) {
        continue;
      }
      const fileExt = path.extname(file);
      const folderName = fileExt ? `${fileExt.substring(1)} Folder` : "no extension Folder";
      const newFolderPath = path.join(folderUrl, folderName);
      try {
        await fs.access(newFolderPath);
      }
      catch (error) {
        await fs.mkdir(newFolderPath, { recursive: true });
        folderNum++;
      }
      const newPath = path.join(newFolderPath, file);
      await fs.rename(oldPath, newPath);
      log.push(`Grouped ${file} into ${folderName}`);
      console.log("Group by type", folderUrl);
    }
  }
  catch (error) {
    console.error("Error during GroupByType:", error);
    log.push(`Error while during Grouping by type`);
  }
  return { name: name, log: log, foldersCreated: folderNum };
}

async function GroupByDate(folderUrl, log, folderNum, name) {
  try {
    const files = await fs.readdir(folderUrl);
    for (const file of files) {
      const oldPath = path.join(folderUrl, file);
      // ignore folder
      const stat = await fs.stat(oldPath);
      if (!stat.isFile()) {
        continue;
      }
      const createdDate = stat.birthtime;
      const monthYear = createdDate.toLocaleString("en-US", {
        month: "short",
        year: "numeric"
      });
      const newFolderPath = path.join(folderUrl, monthYear);
      console.log(newFolderPath);
      try {
        await fs.access(newFolderPath);
      }
      catch (error) {
        await fs.mkdir(newFolderPath, { recursive: true });
        folderNum++;
      }
      const newPath = path.join(newFolderPath, file);
      await fs.rename(oldPath, newPath);
      log.push(`Grouped ${file} into ${monthYear}`);
    }
  }
  catch (error) {
    console.error("Error during GroupByDate:", error);
    log.push(`Error while during Grouping by date`);
  }
  return { name: name, log: log, foldersCreated: folderNum };
}

async function GroupBySize(folderUrl, log, folderNum, name) {
  try {
    const files = await fs.readdir(folderUrl);
    for (const file of files) {
      const oldPath = path.join(folderUrl, file);
      // ignore folder
      const stat = await fs.stat(oldPath);
      if (!stat.isFile()) {
        continue;
      }
      const fileSize = stat.size;
      const folderName = (() => {
        switch (true) {
          case fileSize < 5 * 1024:
            return "Under 5KB";
          case fileSize < 500 * 1024:
            return "5KB-500KB";
          case fileSize < 1024 * 1024:
            return "500KB-1MB";
          case fileSize < 10 * 1024 * 1024:
            return "1MB-10MB";
          case fileSize < 100 * 1024 * 1024:
            return "10MB-100MB";
          case fileSize < 500 * 1024 * 1024:
            return "100MB-500MB";
          case fileSize < 1024 * 1024 * 1024:
            return "500MB-1GB";
          case fileSize < 10 * 1024 * 1024 * 1024:
            return "1GB-10GB";
          default:
            return "Over 10GB";
        }
      })();
      const newFolderPath = path.join(folderUrl, folderName);
      console.log(newFolderPath);
      try {
        await fs.access(newFolderPath);
      }
      catch (error) {
        await fs.mkdir(newFolderPath, { recursive: true });
        folderNum++;
      }
      const newPath = path.join(newFolderPath, file);
      await fs.rename(oldPath, newPath);
      log.push(`Grouped ${file} into ${folderName}`);
    }
  }
  catch (error) {
    console.error("Error during GroupBySize", error);
    log.push(`Error while Grouping by size`);
  }
  return { name: name, log: log, foldersCreated: folderNum };
}

async function RemoveDuplicates(folderUrl, log) {
  const duplicateFileRegex = /^(.+?)(?:\s*(?:-?\s*\bcopy\b(?:\s*\d+)?(?:\s*\(\d+\))?|\((?:.*?\bcopy\b|\d+)\)))?\.[^.]+$/i;
  const fileInfoMap = new Map();
  try {
    const files = await fs.readdir(folderUrl);
    for (const file of files) {
      const filePath = path.join(folderUrl, file);
      const stat = await fs.stat(filePath);
      const match = file.match(duplicateFileRegex);
      if (!match) continue;
      const baseName = match[1];
      const ext = path.extname(file);
      const key = baseName + ext;

      if (fileInfoMap.has(key)) {
        const existing = fileInfoMap.get(key);
        if (existing.size == stat.size) {
          console.log(`Deleting duplicate file: ${file}`);
          log.push(`Deleting duplicate: ${file}`);
          await fs.unlink(filePath);
        }
      }
      else {
        fileInfoMap.set(key, { size: stat.size, path: filePath });
      }
    }
  }
  catch (error) {
    console.error("Error while deleting duplicates:", error);
    log.push(`Error while deleting duplicates`);
  }
  return log;
}

ipcMain.handle("sort-folder", HandleSort);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});