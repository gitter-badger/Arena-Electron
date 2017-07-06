const bulletSize = 5;
const bulletSpeed = 25;
const maxBounces = 3;
const maxDamage = 10;
// const Player = require('./player').Player;

class Bullet {
    constructor(x, y, angle, owner, bulletNum) {
        // x and y will come in as the center point
        this.x = x - (bulletSize / 2);
        this.y = y - (bulletSize / 2);
        this.size = bulletSize;
        this.xChange = bulletSpeed * Math.cos(angle);
        this.yChange = -bulletSpeed * Math.sin(angle);
        this.bouncesRemaining = maxBounces;
        this.owner = owner;
        this.bulletNum = bulletNum;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        if (typeof x !== 'number') {
            throw new Error('"x" must be a number');
        }
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        if (typeof y !== 'number') {
            throw new Error('"y" must be a number');
        }
        this._y = y;
    }

    get xChange() {
        return this._xChange;
    }

    set xChange(xChange) {
        if (typeof xChange !== 'number') {
            throw new Error('"xChange" must be a number');
        }
        else if (xChange > bulletSpeed) {
            throw new Error('"xChange" cannot be greater than the maximum bullet speed');
        }
        this._xChange = xChange;
    }

    get yChange() {
        return this._yChange;
    }

    set yChange(yChange) {
        if (typeof yChange !== 'number') {
            throw new Error('"yChange" must be a number');
        }
        else if (yChange > bulletSpeed) {
            throw new Error('"yChange" cannot be greater than the maximum bullet speed');
        }
        this._yChange = yChange;
    }

    get bouncesRemaining() {
        return this._bouncesRemaining;
    }

    set bouncesRemaining(bouncesRemaining) {
        if (typeof bouncesRemaining !== 'number') {
            throw new Error('"bouncesRemaining" must be a number');
        }
        else if (bouncesRemaining < 0) {
            throw new Error('"bouncesRemaining" cannot be less than 0');
        }
        this._bouncesRemaining = bouncesRemaining;
    }

    get owner() {
        return this._owner;
    }

    set owner(owner) {
        if (typeof(owner) !== 'object') {
            throw new Error('"owner" must be a Player instance');
        }
        this._owner = owner;
    }

    get bulletNum() {
        return this._bulletNum;
    }

    set bulletNum(bulletNum) {
        if (typeof bulletNum !== 'number') {
            throw new Error('"bulletNum" must be a number');
        }
        else if (bulletNum < 0 || bulletNum > this.owner.bullets.length) {
            throw new Error('"bulletNum" is not a valid index');
        }
        else if (typeof this._bulletNum !== 'undefined') {
            throw new Error('"bulletNum" cannot change after assignment');
        }
        this._bulletNum = bulletNum;
    }

    draw /* istanbul ignore next */ (context) {
        context.fillRect(this.x, this.y, bulletSize, bulletSize);
        this.updatePosition();
    }

    updatePosition() {
        this.x += this.xChange;
        this.y += this.yChange;
    }

    bounce() {
        // Make the bullet bounce
        if(this.bouncesRemaining > 0) {
            this.bouncesRemaining -= 1;
            return false;
        }
        else {
            this.owner.bulletDestroyed(this.bulletNum);
            return true;
        }
    }
}

exports.Bullet = Bullet;
