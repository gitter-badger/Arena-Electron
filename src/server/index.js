const WebSocketServer = require('websocket').server;
const http = require('http');
const Lobby = require('./lobby').Lobby;

// We'll create a websocket server in this file, and have 2 files that will maintain the different handlers for lobby
// and game servers

class Server {
    constructor(password, done) {
        process.send('Server starting up at ' + new Date());
        process.on('message', (message) => {
            process.send(message);
            message = JSON.parse(message);
            switch (message.command) {
                case 'CLOSE':
                    // Call for server to close
                    let data = {
                        command: 'CLOSE'
                    };
                    data = JSON.stringify(data);
                    this.sockets.forEach((sock, i) => {
                        if (i !== 0 && sock !== null) sock.sendUTF(data);
                    });
                    process.exit(0);
            }
        });
        // Save the function allowing for the Server to close
        this.done = done;
        this.password = password;
        this.players = 0;
        this.playerObjects = [null, null, null, null];
        this.sockets = [null, null, null, null];

        // Message handling system
        this.handler = new Lobby(this.playerObjects, this.sockets);

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
                if (message.command === 'JOIN' && this.players < 4){
                    this.players ++;
                    // Find the first null spot in objects
                    let i;
                    for(i = 0; i < this.playerObjects.length; i ++) {
                        if (this.playerObjects[i] === null) {
                            break;
                        }
                    }
                    this.playerObjects[i] = message.username; // new Player(message.username);
                    this.sockets[i] = connection;

                    process.send(message.username + ' joined the game');

                    // Send new lobby state to players
                    let data = {
                        command: 'LOBBY',
                        data: this.playerObjects // TODO - Replace with list of user names when Player object is made
                    };
                    data = JSON.stringify(data);
                    this.sockets.forEach((sock) => {
                        if(sock !== null) {
                            sock.sendUTF(data);
                        }
                    });
                    connection.on('message', (message) => {
                        this.handler.handle(message, connection);
                    })
                }
            });
        });
    }
}

exports.Server = Server;

if(require.main === module) {
    new Server('', () => {});
}