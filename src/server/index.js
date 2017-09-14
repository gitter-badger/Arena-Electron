const WebSocketServer = require('websocket').server;
const http = require('http');
const Lobby = require('./lobby').Lobby;

// We'll create a websocket server in this file, and have 2 files that will maintain the different handlers for lobby
// and game servers

class Server {
    constructor(password) {
        process.on('message', (message) => {
            message = JSON.parse(message);
            switch (message.command) {
                case 'CLOSE': {
                    // Call for server to close
                    let data = {
                        command: 'CLOSE'
                    };
                    data = JSON.stringify(data);
                    this.sockets.forEach((sock, i) => {
                        if (i !== 0 && sock !== null) sock.sendUTF(data);
                    });
                    process.exit(0);
                    break;
                }
            }
        });
        // Save the function allowing for the Server to close
        this.password = password;
        this.numPlayers = 0;
        this.playerObjects = [null, null, null, null];
        this.sockets = [null, null, null, null];

        // Message handling system
        this.handler = new Lobby(this);

        // Set up the websocket server
        let httpServer = http.createServer();

        httpServer.listen(44444, () => {});
        this.server = new WebSocketServer({
            httpServer: httpServer,
            autoAcceptConnections: false
        });

        // Set up listeners
        this.server.on('request', (request) => {
            let connection = request.accept('arena-electron', request.origin);

            // Initial handler for Players JOINing the game
            connection.on('message', (message) => {
                message = JSON.parse(message.utf8Data);
                if (message.command !== 'JOIN'){
                    this.sendError(connection, 'Invalid Protocol Header');
                }
                else if (message.password !== this.password) {
                    this.sendError(connection, 'Incorrect Password');
                }
                else if (this.numPlayers === 4) {
                    this.sendError(connection, 'Lobby Full');
                }
                else {
                    this.numPlayers ++;
                    // Find the first null spot in objects
                    let i;
                    for(i = 0; i < this.playerObjects.length; i ++) {
                        if (this.playerObjects[i] === null) {
                            break;
                        }
                    }
                    this.playerObjects[i] = message.username; // new Player(message.username);
                    this.sockets[i] = connection;

                    // Send new lobby state to players
                    let data = {
                        command: 'LOBBY',
                        players: this.playerObjects // TODO - Replace with list of user names when Player object is made
                    };
                    data = JSON.stringify(data);
                    this.sockets.forEach((sock) => {
                        if(sock !== null) {
                            sock.sendUTF(data);
                        }
                    });
                    connection.on('message', (message) => {
                        this.handler.handle(message, connection);
                    });
                }
            });
        });
    }

    sendError(socket, errorMessage) {
        socket.sendUTF(JSON.stringify({
            command: 'ERROR',
            errorMessage: errorMessage
        }));
        socket.close();
    }
}

exports.Server = Server;

if(require.main === module) {
    let password = '';
    // Get the password from the argv
    process.argv.forEach((val) => {
        let split = val.split('password=');
        if (split.length > 1) {
            password = split[1];
        }
    });
    new Server(password);
}