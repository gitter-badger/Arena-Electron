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

### size

An instance based storage of the player size. Purely for use in collision testing

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
    x,          // Type: Number
    y,          // Type: Number
    username,   // Type: String
    colour,     // Type: String
    local=false // Type: Boolean
) {}
```

Creates a new Player instance at the point (x, y) with the name username

### Parameters
| Parameter |                                   Description                                   |
| --------- | ------------------------------------------------------------------------------- |
|     x     |             The x co-ordinate of the top left corner of the Player              |
|     y     |             The y co-ordinate of the top left corner of the Player              |
|  username |                The username of the person controlling the Player                |
|   colour  |                 The colour that this Player will be rendered in                 |
|   local   | A flag that is only true for the Player instance being controlled by the Client |

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

### alive
```js
function get alive() {}
```

A flag indicating whether the Player instance is "alive", meaning its health is over 0

!!! note
	As it has the `get` keyword, this method is run as if it was an instance variable

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
	e,     // Type: MouseEvent
	canvas // Type: Canvas
)
```

Makes this Player instance fire a [Bullet][1], if there are bullets remaining that can be fired.

A pointer to the canvas is passed in as there was an issue with calculating the mouse click's location on the canvas, we now need to get some details from the canvas object itself to ensure shooting is as accurate as possible

#### Parameters
| Parameter |              Description              |
| --------- | ------------------------------------- |
|     e     | The event object sent via mouse click |
|   canvas  |    A pointer to the game's canvas     |

### bulletDestroyed
```js
function bulletDestroyed(
	num // Type: Number
)
```

A callback from a Bullet that has been destroyed for whatever reason. Removed the Bullet for the Player's array and increments the number of Bullets the Player can fire by one, allowing another to be fired

#### Parameters
| Parameter |                            Description                           |
| --------- | ---------------------------------------------------------------- |
|    num    | The index of the destroyed Bullet in this Player's bullets array |

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

### takeDamage
```js
function takeDamage(
	dmg // Type: Number
)
```

Called by an object dealing damage to the Player instance. Causes the instance to take damage immediately

#### Parameters
| Parameter |                           Description                          |
| --------- | -------------------------------------------------------------- |
|    dmg    | The amount of damage that was inflicted to the Player instance |

### checkPlayerCollision
```js
function checkPlayerCollision(
	p // Type: Player
)
```

Only run by the local Player

Checks if the local Player is in contact with another Player instance. If so, the Player will receive 1/30 HP damage every frame they are in contact, resulting in a 2 HP/s loss

#### Parameters
| Parameter |                                 Description                               |
| --------- | ------------------------------------------------------------------------- |
|     p     | The Player instance to be checked against. Will not be the same as `this` |


[1]: /game/bullet "Bullet"
