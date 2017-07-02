# Game
```
class Arena
```

Class that manages the running of the game on screen.

Handles drawing of all Player, Obstacle and Bullet objects on screen.

Also handles all communication with the Server for updating remote players

## Instance Variables

### Context

The context object used to render onto the game's canvas

### Width

The width in pixels of the game's canvas

### Height

The height in pixels of the game's canvas

### Players

An array of Player objects representing the Player in the current game

### Obstacles

An array of Obstacle objects that are in the current map

***

## Constructor
```
constructor(
    Canvas canvas
)
```

Given a canvas, sets up all necessary objects to start the game

### Parameters
| Parameters |                   Description                    |
| ---------- | ------------------------------------------------ |
|   canvas   | The canvas object that the game will be drawn on |

***

## Methods

### setupObstacles
```
setupObstacles()
```

Currently creates the preset 4 Obstacles used in the original Arena, and adds them to the obstacles array.

> Will be updated later to load obstacles from a json file

### setupPlayers
```
setupPlayers()
```

Currently creates 4 Player objects, places them in the original spawn positions from Arena, and adds them to the players array.

> Will be updated later to load Player spawn points from a json file

### update
```
update()
```

The heartbeat of the game, this method is called every frame to manage tasks that need to occur on a frame by frame basis, i.e rendering

### draw
```
draw()
```

Clears the canvas, then loops through the arrays of Players, Bullets, and Obstacles and re-draws them to the screen