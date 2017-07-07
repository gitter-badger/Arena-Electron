const Obstacle = require('./obstacle').Obstacle;

class BulletBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#3ECAE8');
    }

    onBulletCollision(bullet) {
    	// We don't really care about the else
    	/* istanbul ignore else */
    	if (!bullet.bounce()) this.reflect(bullet);
    }

    onPlayerCollision(player) { }
}

exports.BulletBlock = BulletBlock;
