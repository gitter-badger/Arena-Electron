const Obstacle = require('./obstacle').Obstacle;

class BulletBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#3ECAE8');
    }

    onBulletCollision(bullet) { }

    onPlayerCollision(player) { }
}

exports.BulletBlock = BulletBlock;