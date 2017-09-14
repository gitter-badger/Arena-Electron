class Obstacle {
    constructor(x1, y1, x2, y2, colour) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.colour = colour;
        this.validateCoordinates();
        this.leftNormal = this.normalise({x: this.y2 - this.y1, y: -(this.x2 - this.x1)});
        this.rightNormal = this.normalise({x: -(this.y2 - this.y1), y: this.x2 - this.x1});
    }

    get angle() {
        // Angle made with the x axis if one of the points was on the x axis
        // In radians
        return Math.atan2(Math.abs(this.y2 - this.y1), Math.abs(this.x2 - this.x1));
    }

    get x1() {
        return this._x1;
    }

    set x1(x1) {
        if (typeof x1 !== 'number') {
            throw new Error('"x1" must be a number');
        }
        this._x1 = x1;
    }

    get y1() {
        return this._y1;
    }

    set y1(y1) {
        if (typeof y1 !== 'number') {
            throw new Error('"y1" must be a number');
        }
        this._y1 = y1;
    }

    get x2() {
        return this._x2;
    }

    set x2(x2) {
        if (typeof x2 !== 'number') {
            throw new Error('"x2" must be a number');
        }
        this._x2 = x2;
    }

    get y2() {
        return this._y2;
    }

    set y2(y2) {
        if (typeof y2 !== 'number') {
            throw new Error('"y2" must be a number');
        }
        this._y2 = y2;
    }

    get colour() {
        return this._colour;
    }

    set colour(colour) {
        if (typeof colour !== 'string') {
            throw new Error('"colour" must be a string');
        }
        else if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour)) {
            throw new Error('"colour" must be a valid hex colour string');
        }
        this._colour = colour;
    }

    draw /* istanbul ignore next */ (context) {
        context.strokeStyle = this.colour;
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
    }

    // The maths will be the same no matter what type of obstacle
    checkCollision(o) {
        // `o` can be Players or Bullets, it doesn't matter
        // First check that they're not already intersecting
        // Use the intersection function with both of the diagonals inside the object
        // Top left - Bottom right diagonal
        let a = {x: o.x, y: o.y},
            b = {x: o.x + o.size, y: o.y + o.size},
            c = {x: this.x1, y: this.y1},
            d = {x: this.x2, y: this.y2};
        if (this.intersection(a, b, c, d)) return true;
        // Top Right - Bottom left diagonal
        a = {x: o.x + o.size, y: o.y};
        b = {x: o.x, y: o.y + o.size};
        if (this.intersection(a, b, c, d)) return true;
        // Now check the next frame
        a = {x: o.x, y: o.y};
        b = {x: o.x + o.xChange, y: o.y + o.yChange};
        return this.intersection(a, b, c, d);
    }

    checkBulletCollision(bullet) {
        if(this.checkCollision(bullet)) this.onBulletCollision(bullet);
    }

    checkPlayerCollision(player) {
        if(this.checkCollision(player)) this.onPlayerCollision(player);
    }

    // These methods will be used by the subclass to handle what happens if a bullet or player collides
    // Since the tests cannot access this class, we can just ignore these methods
    onBulletCollision /* istanbul ignore next */ () {
        throw TypeError('Abstract class cannot collide');
    }

    onPlayerCollision /* istanbul ignore next */ () {
        throw TypeError('Abstract class cannot collide');
    }

    // Helper methods
    validateCoordinates() {
        // Ensures that (x1, y1) is closer to (0, 0) than (x2, y2)
        if(this.pointDistance(0, 0, this.x1, this.y1) > this.pointDistance(0, 0, this.x2, this.y2)) {
            // Swap co-ords
            let temp = this.x2;
            this.x2 = this.x1;
            this.x1 = temp;

            temp = this.y2;
            this.y2 = this.y1;
            this.y1 = temp;
        }
    }

    pointDistance(x1, y1, x2, y2) {
        return Math.sqrt(
            Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)
        );
    }

    ccw(a, b, c) {
        // Determines if points are listed in counterclockwise order
        let ccw = ((c.y - a.y) * (b.x - a.x)) - ((b.y - a.y) * (c.x - a.x));
        return ccw > 0.0 ? 1 : ccw < 0.0 ? -1 : 0;
    }

    intersection(a, b, c, d) {
        // Determines if line segments a -> b and c -> d intersect eachother
        return this.ccw(a, c, d) !== this.ccw(b, c, d) && this.ccw(a, b, c) !== this.ccw(a, b, d);
    }

    normalise(v) {
        // Normalizes the vector v to a unit vector
        let len = Math.sqrt(
            Math.pow(v.x, 2) + Math.pow(v.y, 2)
        );
        return {x: v.x / len, y: v.y / len};
    }

    reflectionNormal(o) {
        // Based on the position of the Player | Bullet o and the angle of this obstacle,
        // determine which normal to use for the reflection
        // If angle < PI / 4, check N/S, else E/W
        let normal;
        if(this.angle >= Math.PI / 4) {
            // Check the E/W of the object
            if(o.x < this.x2) normal =  this.leftNormal;
            // I think it's safe to leave this as an else
            else normal = this.rightNormal;
        }
        else {
            // Check the N/S position of the object
            // It is below the obstacle if the y of the object is less than y1 of the obstacle
            if(o.y < this.y1) normal = this.leftNormal;
            else normal = this.rightNormal;
        }
        return normal;
    }

    reflect(bullet) {
        // Reflect the Bullet object off this obstacle
        let normal = this.reflectionNormal(bullet);
        let incidence = {x: bullet.xChange, y: bullet.yChange};
        // perp = 2.0 * dot(incidence, normal)
        let perp = 2 * ((incidence.x * normal.x) + (incidence.y * normal.y));
        let reflection = {x: normal.x * perp, y: normal.y * perp};
        bullet.xChange = (incidence.x - reflection.x);
        bullet.yChange = (incidence.y - reflection.y);
    }
}

exports.Obstacle = Obstacle;
