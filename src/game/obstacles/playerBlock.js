const Obstacle = require('./obstacle').Obstacle;

class PlayerBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#00FF00');
    }

    onBulletCollision(bullet) { }

    onPlayerCollision(player) {
    	player.x -= 2 * player.xChange;
        player.y -= 2 * player.yChange;
        [37, 38, 39, 40].forEach((key) => {
            player.stop({keyCode: key});
        });
    }
}

exports.PlayerBlock = PlayerBlock;
