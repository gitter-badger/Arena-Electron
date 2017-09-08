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

!!! seealso "See Also"
    [Obstacle Types](#obstacle-types)

### leftNormal, rightNormal

The unit vectors of the perpendicular lines to this Obstacle when this Obstacle is treated like a vector.

These values are used to calculate the reflection angle for a Bullet reflection

***

## Constructor
```js
function constructor(
    x1,    // Type: Number
    y1,    // Type: Number
    x2,    // Type: Number
    y2,    // Type: Number
    colour // Type: String
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

### checkCollision
```js
function checkCollision(
    o // Type: Player || Bullet
)
```

Determines whether or not the object o has will collide with this Obstacle during its next frame

#### Parameters
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|     o     |  The Player or Bullet instance to be checked  |

#### Returns
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
| collision |   True if the instance collided, else false   |

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

### ccw
```js
function ccw(
    a, // Type: Object {x, y}
    b, // Type: Object {x, y}
    c  // Type: Object {x, y}
)
```

!!! seealso ""
    This is taken from [here](http://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/)

Determines whether or not the 3 points a, b, and c are listed in counter-clockwise order

a, b, and c are all objects representing (x, y) co-ordinates

### intersect
```js
function intersect(
    a, // Type: Object {x, y}
    b, // Type: Object {x, y}
    c, // Type: Object {x, y}
    d  // Type: Object {x, y}
)
```

!!! seealso ""
    This is taken from [here](http://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/)

Uses the `ccw` method to determine if the line segments `a -> b` and `c -> d` intersect

### normalise
```js
function normalise(
    v // Type: Vector
)
```

Converts a vector into its unit vector form. A unit vector is a vector whose magnitude is 1.

The normals must be normalised to use them to find the angle of reflection

#### Parameters
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|     v     |          The vector to be normalised          |

#### Returns
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|     v     |    The unit vector form of input vector v     |

### reflectionNormal
```js
function reflectionNormal(
    o // Type: Player || Bullet
)
```

Given a Player || Bullet instance o, which has been confirmed to be colliding with this Obstacle, determine which of the two normal vectors (`this.leftVector` || `this.rightVector`) to be used in the calculation for reflection

The vector is calculated using a combination of the Obstacles angle with the x-axis, and the (x, y) position of the object before collision

#### Parameters
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|     o     |  The Player or Bullet instance to be checked  |

#### Returns
| Parameter |                                      Description                                      |
| --------- | ------------------------------------------------------------------------------------- |
|     v     | The unit vector normal to be used to calculate the angle of reflection for the object |

### reflect
```js
function reflect(
    bullet // Type: Bullet
)
```

Given a Bullet that has been confirmed to be colliding with this Obstacle, reflect the Bullet off of the Obstacle according to the following algorithm

```js
let newDirection = oldDirection - ( ( 2 * ( dotProduct( oldDirection, reflectionNormal ) ) ) * reflectionNormal );
```

This method directly modifies the Bullet instance, and does not return anything

#### Parameters
| Parameter |                  Description                  |
| --------- | --------------------------------------------- |
|   bullet  |      The Bullet instance to be reflected      |

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

| Colour  | Bullet Reaction | Player Reaction |     Name     |
| ------- | --------------- | --------------- | ------------ |
| #3ECAE8 |     Bounce      |   Pass Through  | Bullet Block |
| #00FF00 |   Pass Through  |       Stop      | Player Block |
| #FF8300 |     Bounce      |       Stop      |    All Block |
| #FF003F |     Destroy     |      Damage     | Damage Block |

[1]: /game/player "Player"
[2]: /game/bullet "Bullet"
