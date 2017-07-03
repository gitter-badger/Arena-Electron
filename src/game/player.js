const playerSize = 20;
const playerSpeed = 4;
const maxBullets = 3;
const maxHealth = 100;

class Player {
    constructor(x, y, username) {
        // (x, y) is top left corner of player
        this.x = x;
        this.y = y;
        this.isMoving = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.username = username;
        this.currentHealth = maxHealth;
        this.currentBullets = maxBullets;
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

    // Logic

    // marking this function to not be covered as it's a rendering method
    // I know it's an ugly syntax but sure look
    draw /* istanbul ignore next */ (context) {
        let displayHealth = "" + parseInt(this.currentHealth);
        // Have to subtract half the size to draw the center of the player at the position (x, y)
        context.fillRect(this.x - (playerSize / 2), this.y - (playerSize / 2), playerSize, playerSize);
        context.fillText(displayHealth, this.x - 10, this.y + 20);
        context.fillText(`${this.currentBullets}/${maxBullets}`, this.x + 10, this.y + 20);
        context.fillText(this.username, this.x, this.y - 13);

        // Update position based on movement
        this.updatePostion();
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
        if (this.isMoving.up) {
            this.y -= playerSpeed;
        }
        if (this.isMoving.down) {
            this.y += playerSpeed;
        }
        if (this.isMoving.left) {
            this.x -= playerSpeed;
        }
        if (this.isMoving.right) {
            this.x += playerSpeed;
        }
    }
}

exports.Player = Player;