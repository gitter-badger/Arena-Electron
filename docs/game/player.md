# Player
```
class Player
```

Class for the Player object, that represents someone's character in the game

## Instance Variables

### (x, y)

The co-ordinates of the top left corner of the Player.

> When drawing, half the size is subtracted in both directions to draw the center of the Player at the point (x, y)

### Username

The username of the person controlling this Player instance

### currentHealth

The health that this Player instance currently has remaining

### currentBullets

The number of bullets this Player instance can currently fire

***

## Constructor
```
constructor(
    Number x,
    Number y,
    String username
)
```

Creates a new Player instance at the point (x, y) with the name username

### Parameters
| Parameter |                        Description                        |
| --------- | --------------------------------------------------------- |
|     x     |  The x co-ordinate of the top left corner of the Player   |
|     y     |  The y co-ordinate of the top left corner of the Player   |
|  username |     The username of the person controlling the Player     |

***

## Methods

### draw
```
draw(
    CanvasRenderingContext2d context
)
```

Handles the drawing of this Player instance onto the canvas using its context