// File for handling messages while in the lobby state

class Lobby {
    constructor(players, sockets) {
        // Takes in arrays of usernames and sockets
        // Eventually, the players array will be an array of Player objects which will contain their socket
        this.players = players;
        this.sockets = sockets;
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
        for (i = 0; i < this.sockets.length; i ++) {
            if (this.sockets[i] === socket) {
                break;
            }
        }
        process.send(this.players[i] + ' has left the lobby');
        this.players[i] = null;
        socket.close();
        this.sockets[i] = null;

        let data = {
            command: 'LOBBY',
            data: this.players
        };
        data = JSON.stringify(data);
        this.sockets.forEach((sock) => {
            if (sock !== null) {
                sock.sendUTF(data);
            }
        });
    }
}

exports.Lobby = Lobby;