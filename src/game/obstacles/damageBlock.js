const Obstacle = require('./obstacle').Obstacle;

class DamageBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#FF003F');
    }

    onBulletCollision(bullet) { }

    onPlayerCollision(player) { }
}

exports.DamageBlock = DamageBlock;