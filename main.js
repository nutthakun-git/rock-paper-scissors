const { app, BrowserWindow, globalShortcut } = require('electron')

let win // Declare win variable outside of createWindow

const createWindow = () => {
  win = new BrowserWindow({ // Assign the win reference here
    width: 800,
    height: 600,
    icon: './img/icon.png'
  })

  win.loadFile('./src/index.html')
  win.setMenu(null)
}

app.whenReady().then(() => {
  createWindow()

  // Register global shortcut (Ctrl+Shift+I) to open DevTools
  globalShortcut.register('Ctrl+Shift+I', () => {
    win.webContents.openDevTools()
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll() // Clean up global shortcuts when the app quits
})
