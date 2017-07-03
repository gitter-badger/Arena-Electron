# Obstacle
```js
class Obstacle {}
```

Abstract base class used for all obstacle types in the Arena.

Handles collisions with both [Players][1] and [Bullets][2].

Also handles the rendering of the obstacle on the canvas.

## Instance Variables

### (x1, y1)

The co-ordinates of the end of the Obstacle closer to (0, 0)

### (x2, y2)

The co-ordinates of the end of the Obstacle further from (0, 0)

### Colour

The Colour the Obstacle will be drawn in on the canvas.

This value will be set by the subclasses

!!! seealso
    [Obstacle Types](#obstacle-types)

***

## Constructor
```js
function constructor(
    x1,    // Type: Number
    y1,    // Type: Number
    x2,    // Type: Number
    y2,    // Type: Number
    colour // Type: Number
)
```

Creates a new Obstacle as a line between the two points (x1, y1) and (x2, y2).

!!! important
    For now, (x1, y1) should be close to (0, 0) than (x2, y2)

### Parameters
| Parameter |                           Description                            |
| --------- | ---------------------------------------------------------------- |
|    x1     |  The x co-ordinate of the end of the Obstacle closer to (0, 0)   |
|    y1     |  The y co-ordinate of the end of the Obstacle closer to (0, 0)   |
|    x2     | The x co-ordinate of the end of the Obstacle further from (0, 0) |
|    y2     | The y co-ordinate of the end of the Obstacle further from (0, 0) |
|  colour   |  A string containing the hex value of the color of the Obstacle  |


***

## Methods

### angle
```js
get angle() {}
```

Calculates the angle made by the Obstacle and a horizontal line passing through one of the points

The angle is in radians

!!! tip
    Because of the `get` keyword, this method is run using `obstacle.angle`

#### Returns
| Parameter |                                              Description                                              |
| --------- | ----------------------------------------------------------------------------------------------------- |
|   angle   | The angle made between this Obstacle instance and a horizontal line passing through one of the points |

### draw
```js
function draw(
    context // Type: CanvasRenderingContext2d
) {}
```

Handles the drawing of this Obstacle instance onto the canvas using its context

#### Parameters
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|  context  | The context from the canvas used for the game |

***

## Collision Checking

### checkBulletCollision
```js
function checkBulletCollision(
    bullet // Type: [Bullet][2]
) {}
```

Checks if a [Bullet][2] has collided with this Obstacle instance

!!! note
    Will call [onBulletCollision](#onbulletcollision) if a collision occurs

#### Parameters
| Parameter |                   Description                   |
| --------- | ----------------------------------------------- |
|  bullet   | The Bullet which is being checked for collision |

### checkPlayerCollision
```js
function checkPlayerCollision(
    player // Type: [Player][1]
) {}
```

Checks if a [Player][1] has collided with this Obstacle instance

!!! note
    Will call [onPlayerCollision](#onplayercollision) if a collision occurs

#### Parameters
| Parameter |                   Description                   |
| --------- | ----------------------------------------------- |
|  player   | The Player which is being checked for collision |

***

## Collision Handling

### onBulletCollision
```js
function onBulletCollision(
    bullet // Type: [Bullet][2]
) {}
```

Makes changes to a [Bullet][2] instance that has collided with this Obstacle

This method makes changes directly to the Bullet instance

!!! note
    Throws a TypeError if ran from the Obstacle Base Class

#### Parameters
| Parameter |                 Description                 |
| --------- | ------------------------------------------- |
|  bullet   | The Bullet that collided with this Obstacle |

### onPlayerCollision
```js
function onPlayerCollision(
    player // Type: [Player][1]
) {}
```

Makes changes to a [Player][1] instance that has collided with this Obstacle

This method makes changes directly to the Player instance

!!! note
    Throws a TypeError if ran from the Obstacle Base Class

#### Parameters
| Parameter |                 Description                 |
| --------- | ------------------------------------------- |
|  player   | The Player that collided with this Obstacle |

***

## Helper Methods

### validateCoordinates
```js
function validateCoordinates() {}
```

Ensures the (x1, y1) is closer to (0, 0) than (x2, y2).

If not, it will swap them

### pointDistance
```js
function pointDistance(
    x1, // Type: Number
    y1, // Type: Number
    x2, // Type: Number
    y2  // Type: Number
) {}
```

Calculates the straight line distance between points (x1, y1) and (x2, y2)

#### Parameters
| Parameter |             Description               |
| --------- | ------------------------------------- |
|    x1     | The x value of the first co-ordinate  |
|    y1     | The y value of the first co-ordinate  |
|    x2     | The x value of the second co-ordinate |
|    y2     | The x value of the second co-ordinate |

#### Returns
| Parameter |                Description                  |
| --------- | ------------------------------------------- |
|  distance | The distance between the co-ordinate pairs  |

***

# Obstacle Types

The current Obstacle types and their colours are as follows:

|  Colour   | Bullet Reaction | Player Reaction |     Name     |
| --------- | --------------- | --------------- | ------------ |
| `#3ECAE8` |     Bounce      |   Pass Through  | Bullet Block |
| `#00FF00` |   Pass Through  |       Stop      | Player Block |
| `#FF8300` |     Bounce      |       Stop      |    All Block |
| `#FF003F` |     Destroy     |      Damage     | Damage Block |

[1]: "Player" /game/player
[2]: "Bullet" /game/bullet