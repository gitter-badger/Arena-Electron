# API

The following page documents the API used in Client-Server communication for Arena: Electron

The API uses a selection of JSON messages, with a `command` key and a selection of other keys depending on the `command`.

All of the different messages and their use cases are outlined below.

# Messages

## CLOSE
```json
{
  "command": "CLOSE"
}
```

When the host wants to close the server, they will send a message to the server process informing it to close.

When the server received this message, it will send out the above `CLOSE` message to all Players in its array informing
each that the host is closing the server.

The `CLOSE` message informs clients that the server they are connected to is closing by external forces.

## ERROR
```json
{
  "command": "ERROR",
  "errorMessage": ""
}
```

The `ERROR` message is currently used to inform incoming connections that they cannot connect for a given reason.

This message provides the ability to pass error messages from the server to a client(s) in a uniform manner.

## JOIN
```json
{
  "command": "JOIN",
  "username": "",
  "password": ""
}
```

The `JOIN` message is used to inform the Server that a client wishes to join the lobby.

The `username` key will contain the Player's username, and if a password was set for the server, the `password` must be
passed as well

## LOBBY
```json
{
  "command": "LOBBY",
  "players": []
}
```

The `LOBBY` message is used to inform all connected clients of updates to the current state of the Lobby.

This is sent to all clients connected whenever a Player `JOINS` or `QUITS` the server while it's in the Lobby state.

## QUIT
```json
{
  "command": "QUIT"
}
```

The `QUIT` message is used by non-host Players who want to leave the server.

Depending on the state of the server, this message will have different outcomes.

- **Lobby** : Removes the Player's username and socket from the respective arrays and updates all connected Players