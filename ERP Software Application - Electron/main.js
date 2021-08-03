// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    minHeight: 560,
    minWidth: 940,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  ipc.on('homePageActive', () => {
    mainWindow.loadFile('src/index.html');
  })

  ipc.on('accountingPageActive', () => {
    mainWindow.loadFile('src/accountingPage.html');
  })

  ipc.on('inventoryPageActive', () => {
    mainWindow.loadFile('src/inventoryPage.html');
  })

  ipc.on('CRMPageActive', () => {
    mainWindow.loadFile('src/CRMPage.html');
  })

  ipc.on('orderFormPageActive', () => {
    mainWindow.loadFile('src/orderForm.html');
  })




  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //Close App
  ipc.on('closeApp', ()=>{
      //console.log('Clicked on Close Button')
      mainWindow.close()
  })

  //Maximize App
  ipc.on('maximizeApp', ()=>{
    //console.log('Clicked on Maximize Button')
    
    if(mainWindow.isMaximized()){
        mainWindow.restore()
    }
    else {
        mainWindow.maximize()
    }
  })  

  //Check if window is maximized
    mainWindow.on('maximize', ()=>{
    mainWindow.webContents.send('isMaximized')
  })

  //Check if window is restored
    mainWindow.on('unmaximize', ()=>{
    mainWindow.webContents.send('isRestored')
  })

  //Minimize App
  ipc.on('minimizeApp', ()=>{
    //console.log('Clicked on Minimize Button')
    mainWindow.minimize()
  })  

  //Testing for manipulating page content based on the button pressed
  ipc.on('loadHomePage', ()=>{
    console.log('Loading Home Page');
  })
  ipc.on('loadAccountingPage', ()=>{
    console.log('Loading Accounting Page');
  })
  ipc.on('loadCRMPage', ()=>{
    console.log('Loading CRM Page');
  })
  ipc.on('loadInventoryPage', ()=>{
    console.log('Loading Inventory Page');
  })

  ipcMain.on('form-submission', function (event, firstname) {
    console.log("this is the firstname from the form ->", firstname)
});



}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.