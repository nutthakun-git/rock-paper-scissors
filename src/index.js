 // Access functions exposed in preload.js
      const sendBtn = document.getElementById('sendBtn');
      
      sendBtn.addEventListener('click', () => {
        // Send message to main process
        window.electron.sendData('Hello from renderer');
      });

      // Listen for messages from the main process
      window.electron.onMessageReceived((event, message) => {
        console.log('Received from main:', message); // Logs the message from the main process
      });