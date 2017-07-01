class Obstacle {
    constructor(x1, y1, x2, y2, colour) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.colour = colour;
        this.validateCoordinates();
    }

    get angle() {
        // Angle made with the x axis if one of the points was on the x axis
        return Math.atan((Math.abs(this.x1 - this.x2) / Math.abs(this.y1 - this.y2)));
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
    checkBulletCollision(bullet) { }

    checkPlayerCollision(player) { }

    // These methods will be used by the subclass to handle what happens if a bullet or player collides
    onBulletCollision(bullet) {
        throw TypeError("Abstract class cannot collide");
    }

    onPlayerCollision(player) {
        throw TypeError("Abstract class cannot collide");
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
}

exports.Obstacle = Obstacle;
