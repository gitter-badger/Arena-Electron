const Obstacle = require('./obstacle').Obstacle;

class AllBlock extends Obstacle {
    constructor(x1, y1, x2, y2){
        super(x1, y1, x2, y2, '#FF8300');
    }

    checkBulletCollision(bullet) {
        // Need to re-do my maths to calculate whether the bullet will pass through or not
    }

    checkPlayerCollision(player) {
        // Players pass through
    }
}

exports.AllBlock = AllBlock;