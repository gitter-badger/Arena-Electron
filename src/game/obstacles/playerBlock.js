const Obstacle = require('./obstacle').Obstacle;

class PlayerBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#00FF00');
    }

    onBulletCollision(bullet) { }

    onPlayerCollision(player) { }
}

exports.PlayerBlock = PlayerBlock;