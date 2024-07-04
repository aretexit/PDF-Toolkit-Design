const {app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')
const excel = require('../JS/excel')
const excel2 = require('../JS/excel-multiple')
const excel3 = require('../JS/toggle')
const docx = require('../JS/docs')
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: './IMAGES/ptk-logo2.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    },
    visibleOnAllWorkspaces: true,
  })
  win.maximize()
  win.loadFile('./HTML/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//<=========================================PDF2EXCEL====================================================>

ipcMain.handle('save-excel', async (event, convertedFilePath) => {
  const excelBuffer = path.join(__dirname, '');

  const pdfFileName = path.basename(convertedFilePath, path.extname(convertedFilePath));
  const defaultPath = app.getPath('downloads');

  const { filePath, canceled } = await dialog.showSaveDialog({
    defaultPath: path.join(defaultPath, pdfFileName),
    filters: [{ name: 'Excel Files', extensions: ['xlsx'] }]
  });

  if (!canceled && filePath) {
    try {
      fs.writeFileSync(filePath, excelBuffer);
      return { filePath };
    } catch (error) {
      console.error('Error saving Excel file:', error);
      fs.unlinkSync(convertedFilePath);
      return { error: 'Error saving Excel file' };
    }
  } else {
    fs.unlinkSync(convertedFilePath);
    console.log('Saving process canceled');
    return null;
  }
});


ipcMain.on('start-conversion', async (event, { filePath, outputDir }) => { 
  try {
    const convertedFilePath = await excel.main(filePath, outputDir); 
    event.reply('conversion-complete', convertedFilePath);
  } catch (error) {
    event.reply('conversion-error', error);
  }
});

ipcMain.on('start-conversion2', async (event, { filePath, outputDir }) => { 
  try {
    const convertedFilePath = await excel2.main(filePath, outputDir); 
    event.reply('conversion-complete', convertedFilePath);
  } catch (error) {
  }
  
});

ipcMain.on('start-conversion-formatting', async (event, { filePath, outputDir }) => { 
  try {
    const convertedFilePath = await excel3.main(filePath, outputDir); 
    event.reply('conversion-complete', convertedFilePath);
  } catch (error) {
  }
  
});

//<=====================================================================================================>

//<=========================================SPLIT PDF====================================================>

ipcMain.on('open-save-dialog', async (event, args) => {
  const { filePaths } = await dialog.showOpenDialog({
    title: 'Save Split PDF',
    defaultPath: app.getPath('downloads'),
    properties: ['openDirectory']
  });
  event.sender.send('selected-directory', filePaths[0]);
});

//<=====================================================================================================>


//<=========================================PDF2DOCS====================================================>

ipcMain.handle('save-docx', async (event, convertedFilePath) => {
  const docxBuffer = path.join(__dirname, './');

  const pdfFileName = path.basename(convertedFilePath, path.extname(convertedFilePath));
  const defaultPath = app.getPath('downloads');

  const { filePath, canceled } = await dialog.showSaveDialog({
    defaultPath: path.join(defaultPath, pdfFileName),
    filters: [{ name: 'Docx Files', extensions: ['docx'] }]
  });

  if (!canceled && filePath) {
    try {
      fs.writeFileSync(filePath, docxBuffer);
      return { filePath };
    } catch (error) {
      console.error('Error saving Docs file:', error);
      fs.unlinkSync(convertedFilePath);
      return { error: 'Error saving Docs file' };
      
    }
  } else {
      fs.unlinkSync(convertedFilePath);
    console.log('Saving process canceled');
    return null;
  }
});

ipcMain.on('docx-conversion', async (event, { filePath, outputDir }) => { 
  try {
    const convertedFilePath = await docx.mainDocx(filePath, outputDir); 
    event.reply('docx-complete', convertedFilePath);
  } catch (error) {
  }
});

//<=====================================================================================================>

ipcMain.on('api', (event, apiKey) => {
  const getApiKey = apiKey;
  event.sender.send('getApiKey', getApiKey);
})

ipcMain.on('apiKey', (event, apiKey) => {
  excel.setApiKey(apiKey);
});

ipcMain.on('apiKey', (event, apiKey) => {
  excel2.setApiKey(apiKey);
});

ipcMain.on('apiKey', (event, apiKey) => {
  excel3.setApiKey(apiKey);
});

ipcMain.on('apiKey', (event, apiKey) => {
  docx.setApiKey(apiKey);
});
