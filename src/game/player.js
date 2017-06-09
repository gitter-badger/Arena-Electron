const playerSize = 20;
const maxBullets = 3;

class Player {
    constructor(x, y, username) {
        // (x, y) is top left corner of player
        this.x = x;
        this.y = y;
        this.username = username;
        this.currentHealth = 100;
        this.currentBullets = maxBullets;
    }

    draw(context){
        let displayHealth = "" + parseInt(this.currentHealth);
        context.fillRect(this.x - (playerSize / 2), this.y - (playerSize / 2), playerSize, playerSize);
        context.fillText(displayHealth, this.x - 10, this.y + 20);
        context.fillText(`${this.currentBullets}/${maxBullets}`, this.x + 10, this.y + 20);
        context.fillText(this.username, this.x, this.y - 13);
    }
}

exports.Player = Player;