const { app, BrowserWindow } = require ('electron');
const path = require('path');


  app.on('ready',()=>{
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,
      },
  })
  win.loadFile(path.join(__dirname, '/dist/project-tcc/browser/index.html'));
})
