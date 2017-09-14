# Lobby Handler
```js
class Lobby {}
```

One of the two handler classes implemented for the server.

Handles incoming Player messages while the game is in the **Lobby** state.

## Instance Variables

### Server

Maintains a pointer back to the server instance in order to manipulate data.

## Constructor
```js
function constructor(
    server // Type: Server
) {}
```

Constructs a Lobby handler for the server `server`

### Parameters
|  Name  |              Description              |
| ------ | ------------------------------------- |
| server | The currently running Server instance |

## Methods

### handle
```js
function handle(
    message,  // Type: UTF8 WebsocketMessage
    socket,   // Type: WebSocketConnection
)
```

Handles an incoming `message` received from `socket`.

Based on the `"command"` value of the received message, this method will call a different method

#### Parameters
|  Name   |                  Description                   |
| ------- | ---------------------------------------------- |
| message |              The received message              |
| socket  | The socket from which the message was received |

### quit
```js
function quit(
    socket // Type: WebSocketConnection
)
```

Handles a `QUIT` message received from `socket`.

Removes the owning Player from the arrays and informs all Players in game of this update.

#### Parameters
|  Name   |                  Description                   |
| ------- | ---------------------------------------------- |
| socket  | The socket from which the message was received |