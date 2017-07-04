const bulletSize = 5;
const bulletSpeed = 25;
const maxBounces = 3;
const maxDamage = 10;

class Bullet {
	constructor(x, y, angle, owner, bulletNum) {
		// x and y will come in as the center point
		this.x = x - (bulletSize / 2);
		this.y = y - (bulletSize / 2);
		this.xChange = bulletSpeed * Math.cos(angle);
		this.yChange = -bulletSpeed * Math.sin(angle);
		this.bouncesRemaining = maxBounces;
		this.owner = owner;
		this.bulletNum = bulletNum;
	}

	draw /* istanbul ignore next */ (context) {
		context.fillRect(this.x, this.y, bulletSize, bulletSize);
		this.updatePosition();
	}

	updatePosition() {
		this.x += this.xChange;
		this.y += this.yChange;
	}
}

exports.Bullet = Bullet;