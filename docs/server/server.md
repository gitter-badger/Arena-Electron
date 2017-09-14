# Server
```js
class Server {}
```

Base class for handling interactions with the Players in the game.

This class provides the functionality for Players to JOIN the game.

All other functionality required by Players will be handled by the two handler classes: Lobby and Game

## Instance Variables

### Password

The password for the server.

This will be supplied to the process by the host, and checked against all JOIN messages for access.

### Num Players

The number of Players currently in the game at any moment in time.

Used to save time by not calculating this value when checking if the lobby is full.

### Player Objects

An array of four spaces to house Player objects

!!! note
    At the moment, this array only stores the Players' usernames in strings.
    If Player objects are determined to be needed in the backend, this will be changed at that point in time
    
### Sockets

An array of four spaces to house WebSocketConnection instances.

The index of each socket is mapped to the username in [Player Objects](#player-objects)

### Handler

The handler class that is currently used to handle incoming messages from sockets in the [Sockets array](#sockets-array).

There is currently a handler for the Lobby, and there will be one for the Game side in the future.

### Server

An instance of WebSocketServer that receives incoming new connections.

## Constructor
```js
function constructor(
    password // Type: string
) {}
```

Sets up a new instance of an Arena server.

This class is forked as a part of the Host Game feature, but it also can be run standalone.

### Parameters
|   Name   |               Description               |
| -------- | --------------------------------------- |
| password | The password used to protect the server |

## Methods

### sendError
```js
function sendError(
    socket,       // Type: WebSocketConnection
    errorMessage  // Type: string
) {}
```

Sends an error message to the connecting socket, and then closes that socket.

This is typically to relay information to the Player that the server is full or the password is incorrect.

#### Parameters
|     Name     |                          Description                          |
| ------------ | ------------------------------------------------------------- |
|    socket    | The connection that the failed JOIN attempt was received from |
| errorMessage |     The error message to be displayed on the user's screen    | 