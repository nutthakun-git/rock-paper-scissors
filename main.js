const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let win; // Declare win variable outside of createWindow

// Function to create the window
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './img/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Link to preload.js
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Enable context isolation for security
    },
  });

  win.loadFile('./src/index.html');
  win.setMenu(null); // Remove default menu
};

// Handle IPC messages from renderer
ipcMain.on('send-message', (event, message) => {
  console.log('Received from renderer:', message);  // Log the message
  event.reply('message-received', 'Message received in main process');
});

app.whenReady().then(() => {
  createWindow();

  // Register global shortcut (Ctrl+Shift+I) to open DevTools
  globalShortcut.register('Ctrl+Shift+I', () => {
    if (win) {
      win.webContents.openDevTools();
    }
  });
});

// Quit when all windows are closed (for macOS, this is handled differently)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Cleanup global shortcuts when the app is about to quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
