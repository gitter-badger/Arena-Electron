const Obstacle = require('./obstacle').Obstacle;
const intersect = require('mathjs').intersect;

class AllBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#FF8300');
    }

    onBulletCollision(bullet) {
        /* istanbul ignore else */
        if (!bullet.bounce()) {
            let pt = intersect(
                [bullet.x, bullet.y],
                [bullet.x + bullet.xChange, bullet.y + bullet.yChange],
                [this.x1, this.y1],
                [this.x2, this.y2]
            );
            // Some arrangement of setting bullet position
            // If bullet moving right, x is the intersect x, else it is intersect x - size
            bullet.x = pt[0];
            bullet.y = pt[1];
            /* istanbul ignore else */
            if(bullet.xChange > 0) {
                bullet.x -= bullet.size;
            }
            /* istanbul ignore else */
            if(bullet.yChange > 0) {
                bullet.y -= bullet.size;
            }
            this.reflect(bullet);
        }
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
