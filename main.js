const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let gameWin;

// Game globals
let server = null;
let socket = null;
// Set ip to be this machine by default
let serverIp = require('ip').address();

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        show: false,
        title: "Arena Electron"
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
        win.loadURL(url);
    });

    win.once('ready-to-show', () => {
        win.show();
    })
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
let createGame = (username, password) => {
    serverIp = require('ip').address();
    // Spawn the server
    // server = new Server(password);

    // Create the window for the game
    gameWin = new BrowserWindow({
        width: 650,
        height: 650,
        resizable: false,
        show: false,
        useContentSize: true,
        title: "Arena Electron"
    });

    // socket = new WebSocket(`ws://${serverIp}:44444`);
    // socket.send("JOIN", username, password);

    // The window will attempt to connect to the server and show or close itself as needed
    gameWin.loadURL(url.format({
        pathname: path.join(__dirname, 'app/html/lobby.html'),
        protocol: 'file:',
        slashes: true
    }));
};

let gameWinSuccess = () => {
    // Close old window and show new one
    gameWin.show();
};

let gameWinFailure = () => {
    // Close this window and display an error on the main window
    gameWin.close();
    gameWin = null;
    // display error
};

let leaveServer = () => {
    // if (server !== null) { close the server } else { socket.send("QUIT") }
    console.log("close");
    gameWin.close();
    gameWin = null;
};

// Exports
// Functions
exports.gameWinSuccess = gameWinSuccess;
exports.gameWinFailure = gameWinFailure;
exports.createGame = createGame;
exports.leaveServer = leaveServer;

// Variables
exports.socket = socket;
exports.serverIp = serverIp;

