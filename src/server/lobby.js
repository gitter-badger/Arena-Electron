// File for handling messages while in the lobby state

class Lobby {
    constructor(server) {
        // Takes in arrays of usernames and sockets
        // Eventually, the players array will be an array of Player objects which will contain their socket
        this.server = server;
    }

    handle(message, socket) {
        // Handles a message from the socket
        message = JSON.parse(message.utf8Data);
        switch (message.command) {
            // Don't need to handle JOIN as this handler is assigned after a valid join
            case 'QUIT':
                this.quit(socket);
                break;
        }
    }

    quit(socket) {
        // Remove the player from the list and send the new lobby status to the players in the lobby
        // Find the player who left
        let i;
        for (i = 0; i < this.server.sockets.length; i ++) {
            if (this.server.sockets[i] === socket) {
                break;
            }
        }
        this.server.playerObjects[i] = null;
        socket.close();
        this.server.sockets[i] = null;
        this.server.numPlayers --;

        let data = {
            command: 'LOBBY',
            players: this.server.playerObjects // NOTE - Replace with Player Objects once implemented
        };
        data = JSON.stringify(data);
        this.server.sockets.forEach((sock) => {
            if (sock !== null) {
                sock.sendUTF(data);
            }
        });
    }
}

exports.Lobby = Lobby;