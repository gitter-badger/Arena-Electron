const Bullet = require('./bullet').Bullet;

const playerSize = 20;
const playerSpeed = 4;
const maxBullets = 3;
const maxHealth = 100;

class Player {
    constructor(x, y, username, colour, local=false) {
        // (x, y) is center of the player
        this.x = x - (playerSize / 2);
        this.y = y - (playerSize / 2);
        this.size = playerSize;
        this.local = local;
        this.isMoving = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.username = username;
        this.currentHealth = maxHealth;
        this.currentBullets = maxBullets;
        this.bullets = [null, null, null];
        this.colour = colour;
    }

    // Getters and Setters

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

    get username() {
        return this._username;
    }

    set username(username) {
        if (typeof username !== 'string') {
            throw new Error('"username" must be a string');
        }
        this._username = username;
    }

    get currentHealth() {
        return this._health;
    }

    set currentHealth(health) {
        if (typeof health !== 'number') {
            throw new Error('"health" must be a number');
        }
        else if (health > maxHealth){
            throw new Error('"health" cannot exceed ' + maxHealth);
        }
        this._health = health;
    }

    get currentBullets() {
        return this._bullets;
    }

    set currentBullets(bullets) {
        if (typeof bullets !== 'number') {
            throw new Error('"bullets" must be a number');
        }
        else if (bullets > maxBullets){
            throw new Error('"bullets" cannot exceed ' + maxBullets);
        }
        this._bullets = bullets;
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

    get xChange() {
        let xChange = 0;
        if (this.isMoving.left) xChange -= playerSpeed;
        if (this.isMoving.right) xChange += playerSpeed;
        return xChange;
    }

    get yChange() {
        let yChange = 0;
        if (this.isMoving.up) yChange -= playerSpeed;
        if (this.isMoving.down) yChange += playerSpeed;
        return yChange;
    }

    get alive() {
        return this.currentHealth > 0;
    }

    // Logic

    // marking this function to not be covered as it's a rendering method
    // I know it's an ugly syntax but sure look
    draw /* istanbul ignore next */ (context) {
        let displayHealth = "" + parseInt(this.currentHealth);
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, playerSize, playerSize);
        context.fillText(displayHealth, this.x - 3, this.y + playerSize + 10);
        context.fillText(`${this.currentBullets}/${maxBullets}`, this.x + playerSize + 3, this.y + playerSize + 10);
        context.fillText(this.username, this.x + (playerSize / 2), this.y - 3);

        // Draw bullets
        this.bullets.forEach((e) => {
            if (e !== null) e.draw(context);
        });

        // Update position based on movement
        this.updatePosition();
    }

    move(e) {
        switch(e.keyCode){
            case 87: // w
            case 38: // up arrow
                this.isMoving.up = true;
                break;
            case 83: // s
            case 40: // down arrow
                this.isMoving.down = true;
                break;
            case 65: // a
            case 37: // left arrow
                this.isMoving.left = true;
                break;
            case 68: // d
            case 39: // right arrow
                this.isMoving.right = true;
                break;
        }
    }

    stop(e) {
        switch(e.keyCode){
            case 87: // w
            case 38: // up arrow
                this.isMoving.up = false;
                break;
            case 83: // s
            case 40: // down arrow
                this.isMoving.down = false;
                break;
            case 65: // a
            case 37: // left arrow
                this.isMoving.left = false;
                break;
            case 68: // d
            case 39: // right arrow
                this.isMoving.right = false;
                break;
        }
    }

    updatePosition() {
        // Update position of the player between frames
        this.x += this.xChange;
        this.y += this.yChange;
    }

    shoot(e, canvas) {
        // Creates a new bullet instance
        if (this.currentBullets > 0) {
            let i = 0;
            for (i; i < maxBullets; i ++) {
                if (this.bullets[i] === null) break;
            }
            let x = this.x + (playerSize / 2);
            let y = this.y + (playerSize / 2);
            let mouseX = e.x - canvas.offsetLeft;
            let mouseY = e.y - canvas.offsetTop;
            let angle = this.getAngle(x, y, mouseX, mouseY);
            this.bullets[i] = new Bullet(x, y, angle, this, i);
            this.currentBullets -= 1;
            return true;
        }
        else {
            return false;
        }
    }

    bulletDestroyed(num) {
        this.bullets[num] = null;
        // There seems to be a weird corner case where this is called twice by a single Bullet
        if (this.currentBullets < maxBullets) this.currentBullets += 1;
    }

    getAngle(sourceX, sourceY, destinationX, destinationY) {
        let opposite;
        let adjacent;
        let angle;
        if(destinationX > sourceX){
            if(destinationY <= sourceY){
                opposite = Math.abs(destinationY - sourceY);
                adjacent = Math.abs(destinationX - sourceX);
                angle = 0;
            }
            else{
                opposite = Math.abs(destinationX - sourceX);
                adjacent = Math.abs(destinationY - sourceY);
                angle = (3 * Math.PI) / 2;
            }
        }
        else{
            if(destinationY <= sourceY){
                opposite = Math.abs(sourceX - destinationX);
                adjacent = Math.abs(sourceY - destinationY);
                angle = Math.PI / 2;
            }
            else{
                opposite = Math.abs(sourceY - destinationY);
                adjacent = Math.abs(sourceX - destinationX);
                angle = Math.PI;
            }
        }
        angle += Math.atan2(opposite, adjacent);
        return angle;
    }

    takeDamage(dmg) {
        // This must be replaced when the server is working as the client should only update its own Player
        this.currentHealth -= dmg;
    }

    checkPlayerCollision(p) {
        // The local check is done in index.js
        /* istanbul ignore if */
        if(!p.isAlive || (this.x + this.size) < p.x || (this.x > p.x + p.size) || (this.y + this.size) < p.y || this.y > (p.y + p.size)) {}
        else {
            this.takeDamage(2/60);
        }
    }
}

exports.Player = Player;
