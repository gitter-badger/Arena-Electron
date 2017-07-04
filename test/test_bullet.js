let chai = require('chai');
let path = require('path');

// We will be using `should` notation - options: should, expect, assert
chai.should();

let Bullet = require(path.join(__dirname, '..', 'src', 'game', 'bullet')).Bullet;
let Player = require(path.join(__dirname, '..', 'src', 'game', 'player')).Player;
const angle = Math.PI / 4;
const player = new Player(200, 200, "Testy McTestface", "#3E75E8");
const bulletSize = 5;
const bulletSpeed = 25;
const maxBounces = 3;

describe('Bullet', () => {
    let bullet;

    beforeEach(() => {
        bullet = new Bullet(200, 200, angle, player, 0);
        player.bullets[0] = bullet;
    });

    describe('x', () => {
        it("returns the value", () => {
            // The passed x value is the center of the bullet
            bullet.x.should.equal(200 - (bulletSize / 2));
        });

        it("can be moved in the x direction", () => {
            bullet.x += 10;
            bullet.x.should.equal(210 - (bulletSize / 2));
        });

        it("only accepts numerical values", () => {
            (() => {
                bullet.x = "x";
            }).should.throw(Error);
        });
    });

    describe('y', () => {
        it("returns the value", () => {
            // The passed y value is the center of the bullet
            bullet.y.should.equal(200 - (bulletSize / 2));
        });

        it("can be moved in the x direction", () => {
            bullet.y += 10;
            bullet.y.should.equal(210 - (bulletSize / 2));
        });

        it("only accepts numerical values", () => {
            (() => {
                bullet.y = "y";
            }).should.throw(Error);
        });
    });

    describe('xChange', () => {
        it("returns the value", () => {
            bullet.xChange.should.equal(Math.cos(angle) * bulletSpeed);
        });

        it("can be changed", () => {
            bullet.xChange += 1;
            bullet.xChange.should.equal((Math.cos(angle) * bulletSpeed) + 1);
        });

        it("only accepts numerical values", () => {
            (() => {
                bullet.xChange = "xChange";
            }).should.throw(Error);
        });

        it("cannot be more than the max speed", () => {
            (() => {
                bullet.xChange = bulletSpeed + 1;
            }).should.throw(Error);
        });
    });

    describe('yChange', () => {
        it("returns the value", () => {
            bullet.yChange.should.equal(Math.sin(angle) * -bulletSpeed);
        });

        it("can be changed", () => {
            bullet.yChange += 1;
            bullet.yChange.should.equal((Math.sin(angle) * -bulletSpeed) + 1);
        });

        it("only accepts numerical values", () => {
            (() => {
                bullet.yChange = "yChange";
            }).should.throw(Error);
        });

        it("cannot be more than the max speed", () => {
            (() => {
                bullet.yChange = bulletSpeed + 1;
            }).should.throw(Error);
        });
    });

    describe('bouncesRemaining', () => {
        it("returns the value", () => {
            bullet.bouncesRemaining.should.equal(maxBounces);
        });

        it("can be changed", () => {
            bullet.bouncesRemaining -= 1;
            bullet.bouncesRemaining.should.equal(maxBounces - 1);
        });

        it("only accepts numerical values", () => {
            (() => {
                bullet.bouncesRemaining = "boing";
            }).should.throw(Error);
        });

        it("cannot be a negative value", () => {
            (() => {
                bullet.bouncesRemaining = -9;
            }).should.throw(Error);
        });
    });

    describe('owner', () => {
        it("returns the value", () => {
            bullet.owner.should.equal(player);
        });

        it("can be changed", () => {
            let newPlayer = new Player(400, 400, "n3wb", '#123456');
            bullet.owner = newPlayer;
            bullet.owner.should.equal(newPlayer);
        });

        it("only accepts objects", () => {
            // I can't import Player into Bullet without an error so I can only check for objects
            (() => {
                bullet.owner = "n3wb";
            }).should.throw(Error);
        });
    });

    describe('bulletNum', () => {
        it("returns the value", () => {
            bullet.bulletNum.should.equal(0);
        });

        it("only accepts numerical values", () => {
            (() => {
                bullet.bulletNum = "bang";
            }).should.throw(Error);
        });

        it("must be a valid index in the Player's bullets array", () => {
            (() => {
                bullet.bulletNum = 5;
            }).should.throw(Error);
        });

        it("cannot be changed after being assigned the first time", () => {
            (() => {
                bullet.bulletNum = 1;
            }).should.throw(Error);
        });
    });

    describe('movement', () => {
        it('can move', () => {
            let oldX = 200 - (bulletSize / 2);
            let oldY = 200 - (bulletSize / 2);
            bullet.updatePosition();
            bullet.x.should.equal(oldX + bullet.xChange);
            bullet.y.should.equal(oldY + bullet.yChange);
        });
    });
});