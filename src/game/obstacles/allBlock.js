const Obstacle = require('./obstacle').Obstacle;

class AllBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#FF8300');
    }

    onBulletCollision(bullet) { }

    onPlayerCollision(player) { }
}

exports.AllBlock = AllBlock;