# Bullet
```js
class Bullet {}
```

Class for a Bullet object, which represents the bullets that Players will be shooting at each other

## Constants

### bulletSize
```js
const bulletSize = 5;
```

The size of each Bullet object

### bulletSpeed
```js
const bulletSpeed = 25;
```

The number of straight line pixels that this Bullet will move in a frame

### maxBounces
```js
const maxBounces = 3;
```

The maximum number of bounces that a Bullet can survive before being destroyed by a collision with a wall or [Obstacle][1]

### maxDamage
```js
const maxDamage = 10;
```

The maximum amount of damage a Bullet can do upon hitting a [Player][2]

The actual damage dealt is lowered by each bounce

## Instance Variables

### (x, y)

The co-ordinates of the top left corner of the Bullet.

!!! tip
    When drawing, half the size is subtracted in both directions to draw the center of the Bullet at the point (x, y)

### size

An instance based storage of the bullet size. Purely for use in collision testing

### (xChange, yChange)

The number of pixels this Bullet instance will move in the x and y directions respectively

This value will be calculated when the Bullet is fired

### bouncesRemaining

The number of bounces the Bullet can still survive before being destroyed

### owner

The [Player][2] instance that fired this Bullet instance

### bulletNum

The index of this Bullet in its owner's Bullet array

## Constructor
```js
function constructor(
	x,
	y,
	angle,
	owner,
	bulletNum
)
```

Creates a new Bullet instance from the center of it's owner travelling in the given angle

!!! note
	The `owner` and `bulletNum` values are used to reference this object in the [Player][1] class that fired it.

### Parameters
| Parameter |                      Description                       |
| --------- | ------------------------------------------------------ |
|     x     | The x co-ordinate of the top left corner of the Bullet |
|     y     | The y co-ordinate of the top left corner of the Bullet |
|   angle   |   The angle in which the Bullet was fired in radians   |
|   owner   |       The Player instance which fired the Bullet       |
| bulletNum |  The index of this Bullet in its owner's bullets array |

## Instance Variables

### draw
```js
function draw(
    context // Type: CanvasRenderingContext2d
) {}
```

Handles the drawing of this Bullet instance onto the canvas using its context and its owner's colour

### updatePosition
```js
function updatePosition() {}
```

Updates the Bullet's position by increasing or decreasing the x and y values by the xChange and yChange values


#### Parameters
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|  context  | The context from the canvas used for the game |

### bounce
```js
function bounce() {}
```

Checks if the Bullet has any bounces remaining, and destroys it if it cannot bounce any more.

Reports back whether the Bullet has been destroyed

#### Returns
| Parameter |                          Description                          |
| --------- | ------------------------------------------------------------- |
| destroyed | True if the Bullet was destroyed by bouncing, false otherwise |

### checkPlayerCollision
```js
function checkPlayerCollision(
	players // Type: Player[]
)
```

Checks if a Player has been hit by this Bullet instance and deals damage to that instance

Ignores the Bullet's owner and Players who have died

!!! warning "Todo"
	Once the server is up and running, this method needs to be changed as a game client should only ever update its `local` player

#### Parameters
| Parameter |                    Description                    |
| --------- | ------------------------------------------------- |
|  players  | Array containing the Player instances in the game |

[1]: /game/obstacle "Obstacle"
[2]: /game/player "Player"
