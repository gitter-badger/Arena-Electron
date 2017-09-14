const {app, BrowserWindow} = require('electron');
const Client = require('websocket').client;
const { fork } = require('child_process');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let gameWin;

// Game globals
let host = false;
let serverProc = null;
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
        title: 'Arena Electron'
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
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

app.on('will-quit', () => {
    if (host) {
        serverProc.send(JSON.stringify({command: 'CLOSE'}));
    }
    else if (socket !== null) {
        socket.sendUTF(JSON.stringify({command: 'QUIT'}));
        socket.close();
    }
});

function createGameWindow() {
    // Create the window for the game
    gameWin = new BrowserWindow({
        width: 650,
        height: 650,
        resizable: false,
        show: false,
        useContentSize: true,
        title: 'Arena Electron'
    });
    // gameWin.webContents.openDevTools();

    // The window will attempt to connect to the server and show or close itself as needed
    gameWin.loadURL(url.format({
        pathname: path.join(__dirname, 'app/html/lobby.html'),
        protocol: 'file:',
        slashes: true
    }));
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
let createGame = (username, password) => {
    host = true;
    serverIp = require('ip').address();

    // Spawn the server
    serverProc = fork(path.join(__dirname, 'src/server/index.js'), ['password=' + password])
        .on('uncaughtException', (e) => {
            leaveServer();
            gameWinFailure('Failed by Uncaught Exception: ' + e);
        });

    // After setting up the server, we want to join it
    joinGame(serverIp, username, password);
};

let joinGame = (address, username, password) => {
    // Join the Game hosted at the given address
    serverIp = address;
    createGameWindow();

    let data = {
        command: 'JOIN',
        username: username,
        password: password
    };
    data = JSON.stringify(data);
    let client = new Client();
    client.on('connectFailed', (e) => {
        gameWinFailure('Connection to server failed. Are you sure the IP is correct and that the server is running?');
    });
    client.on('connect', (conn) => {
        gameWinSuccess();
        socket = conn;
        socket.sendUTF(data);
        socket.on('message', (message) => {
            let parsedMessage = JSON.parse(message.utf8Data);
            if (parsedMessage.command !== 'ERROR') {
                gameWin.webContents.send('server-message', message);
            }
            else{
                gameWinFailure(parsedMessage.errorMessage);
            }
        });
    });

    gameWin.webContents.once('did-finish-load', () => {
        client.connect(`ws://${serverIp}:44444`, 'arena-electron');
    });

    // Use the gameWinFailure method to display error messages
};

let gameWinSuccess = () => {
    // Close old window and show new one
    gameWin.show();
    win.hide();
};

let gameWinFailure = (errorMessage) => {
    // Close this window and display an error on the main window
    gameWin.close();
    gameWin = null;
    host = false;
    // display error
    win.show();
    win.webContents.send('server-error', errorMessage);
};

let leaveServer = () => {
    if (host) {
        serverProc.send(JSON.stringify({command: 'CLOSE'}));
    }
    else {
        socket.sendUTF(JSON.stringify({command: 'QUIT'}));
    }
    socket.close();
    gameWin.close();
    gameWin = null;
    win.show();
};

// Exports
// Functions
exports.gameWinSuccess = gameWinSuccess;
exports.gameWinFailure = gameWinFailure;
exports.createGame = createGame;
exports.joinGame = joinGame;
exports.leaveServer = leaveServer;

// Variables
exports.socket = socket;
exports.serverIp = serverIp;

