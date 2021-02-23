const { app, BrowserWindow, desktopCapturer } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        frame: true,
        maximizable: false,
        fullscreen: false,
        alwaysOnTop: true,
        x: 1200,
        y: 1000,
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
            webSecurity: true,
        }
    });

    win.loadFile(`index.html`);
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    };
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    };
});
