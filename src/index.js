const { app, BrowserWindow, desktopCapturer } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        frame: false,
        maximizable: false,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            //devTools: false,
            webSecurity: false,
        },
        node: {
            __dirname: false,
            __filename: false
        }
    });

    win.loadFile(`index.html`);
    win.minimize();
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
