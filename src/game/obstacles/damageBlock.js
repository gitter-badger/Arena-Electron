const Obstacle = require('./obstacle').Obstacle;

class DamageBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#FF003F');
    }

    onBulletCollision(bullet) {
    	bullet.bouncesRemaining = 0;
    	bullet.bounce();
    }

    onPlayerCollision(player) {
    	if (player.local) player.takeDamage(2/60);
    }
}

exports.DamageBlock = DamageBlock;
