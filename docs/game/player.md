# Player
```js
class Player {}
```

Class for the Player object, that represents someone's character in the game

## Constants

### playerSize
```js
const playerSize = 20;
```

The size of each Player object

### playerSpeed
```js
const playerSpeed = 4;
```

The number of pixels a Player will move per frame in each direction

### maxBullets
```js
const maxBullets = 3;
```

The maximum number of [Bullets][1] that a Player can have on screen at any one time

### maxHealth
```js
const maxHealth = 100;
```

The maximum value for a Player's health

## Instance Variables

### (x, y)

The co-ordinates of the top left corner of the Player.

!!! tip
	When drawing, half the size is subtracted in both directions to draw the center of the Player at the point (x, y)

### isMoving
```js
this.isMoving = {
	up: false,
	down: false,
	left: false,
	right: false
}
```

A Javascript Object containing the 4 cardinal directions and a boolean stating whether or not the Player instance is currently moving in that direction

These booleans will be used by the `updatePositon` method to determine the position of the player for the next frame

### username

The username of the person controlling this Player instance

### colour

A hex string representing the colour of this Player instance

### currentHealth

The health that this Player instance currently has remaining

### currentBullets

The number of [Bullets][1] this Player instance can currently fire

### bullets

An array of [Bullet][1] objects that the Player instance owns

***

## Constructor
```js
function constructor(
    x,        // Type: Number
    y,        // Type: Number
    username, // Type: String
    colour    // Type: String
) {}
```

Creates a new Player instance at the point (x, y) with the name username

### Parameters
| Parameter |                        Description                        |
| --------- | --------------------------------------------------------- |
|     x     |  The x co-ordinate of the top left corner of the Player   |
|     y     |  The y co-ordinate of the top left corner of the Player   |
|  username |     The username of the person controlling the Player     |
|   colour  |      The colour that this Player will be rendered in      |

***

## Methods

### xChange, yChange
```js
function get xChange() {}
function get yChange() {}
```

Using the values contained in `isMoving`, calculates the number of pixels this Player instance will move this frame in the x and y directions respectively

!!! note
	As they have the `get` keyword, these methods are run as if they were instance variables

### draw
```js
function draw(
    context // Type: CanvasRenderingContext2d
) {}
```

Handles the drawing of this Player instance onto the canvas using its context

### move
```js
function move(
	e // Type: KeyboardEvent
)
```

Handles the movement of the local Player object on the screen

Called from a `keydown` event

### stop
```js
function stop(
	e // Type: KeyboardEvent
)
```

Handles the stopping of movement of the local Player object

Called from a `keyup` event

### updatePosition
```js
function updatePosition() {}
```

Reads the booleans in `isMoving` and updates the Player instance's x and y values according to the button(s) being pressed

### shoot
```js
function shoot(
	e // Type: MouseEvent
)
```

#### Parameters
| Parameter |              Description              |
| --------- | ------------------------------------- |
|     e     | The event object sent via mouse click |

Makes this Player instance fire a [Bullet][1]

### getAngle
```js
function getAngle(
	sourceX,      // Type: Number
	sourceY,      // Type: Number
	destinationX, // Type: Number
	destinationY  // Type: Number
)
```

Calculates the angle in radians between the points (sourceX, sourceY) and (destinationX, destinationY)

#### Parameters
|    Parameter   |                 Description                |
| -------------- | ------------------------------------------ |
|    sourceX     |      The x co-ordinate of the source       |
|    sourceY     |      The y co-ordinate of the source       |
|  destinationX  |    The x co-ordinate of the destination    |
|  destinationY  |    The y co-ordinate of the destination    |

#### Returns
| Parameter |                              Description                              |
| --------- | --------------------------------------------------------------------- |
|   angle   | The angle between (sourceX, sourceY) and (destinationX, destinationY) |

[1]: /game/bullet "Bullet"
