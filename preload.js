const { contextBridge, ipcRenderer } = require('electron');

// Expose a method to send data to the main process
contextBridge.exposeInMainWorld('electron', {
  sendData: (message) => ipcRenderer.send('send-message', message),
  
  // Expose a method to receive data from the main process
  onMessageReceived: (callback) => ipcRenderer.on('message-received', callback),
});
