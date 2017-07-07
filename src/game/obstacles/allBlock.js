const Obstacle = require('./obstacle').Obstacle;

class AllBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#FF8300');
    }

    onBulletCollision(bullet) {
        /* istanbul ignore else */
        if (!bullet.bounce()) this.reflect(bullet);
    }

    onPlayerCollision(player) {
        // Stop all movement
        player.x -= 2 * player.xChange;
        player.y -= 2 * player.yChange;
        [37, 38, 39, 40].forEach((key) => {
            player.stop({keyCode: key});
        });
    }
}

exports.AllBlock = AllBlock;
