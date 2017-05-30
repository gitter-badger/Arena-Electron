const {app, BrowserWindow} = require('electron');
const dialog = require('electron').dialog;
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let canClose = true;
let promptCloseUrls = [
    'file://' + path.join(__dirname, 'app/html/lobby.html'),
    'file://' + path.join(__dirname, 'app/html/game.html'),
];

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.on('load-page', (e, url) => {
        process.stderr.write(url);
        if(!canClose){
            let choice = dialog.showMessageBox(this,
                {
                    type: 'question',
                    buttons: ['Yes', 'No'],
                    title: 'Confirm',
                    message: 'Are you sure you want to quit?'
                });
            if(choice === 1){
                e.preventDefault();
            }
        }
        else {
            canClose = !(url in promptCloseUrls);
            win.loadURL(url);
        }
    });

    win.on('close', (e) => {
        if(!canClose){
            let choice = dialog.showMessageBox(this,
                {
                    type: 'question',
                    buttons: ['Yes', 'No'],
                    title: 'Confirm',
                    message: 'Are you sure you want to quit?'
                });
            if(choice === 1){
                e.preventDefault();
            }
        }
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
