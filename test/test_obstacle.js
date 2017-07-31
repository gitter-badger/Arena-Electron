let chai = require('chai');
let path = require('path');

let should = chai.should();

let Obstacle = require(path.join(__dirname, '..', 'src', 'game', 'obstacles'));
let Bullet = require(path.join(__dirname, '..', 'src', 'game', 'bullet')).Bullet;
let Player = require(path.join(__dirname, '..', 'src', 'game', 'player')).Player;

describe('Obstacle', () => {
    let obstacle;

    describe('Base Class Testing', () => {
        beforeEach(() => {
            // Straight horizontal line
            obstacle = new Obstacle.BulletBlock(0, 50, 50, 50);
        });

        describe('x1', () => {
            it('returns the value', () => {
                obstacle.x1.should.equal(0);
            });

            it('only accepts numerical values', () => {
                (() => {
                    obstacle.x1 = 'x1';
                }).should.throw(Error);
            });
        });

        describe('y1', () => {
            it('returns the value', () => {
                obstacle.y1.should.equal(50);
            });

            it('only accepts numerical values', () => {
                (() => {
                    obstacle.y1 = 'y1';
                }).should.throw(Error);
            });
        });

        describe('x2', () => {
            it('returns the value', () => {
                obstacle.x2.should.equal(50);
            });

            it('only accepts numerical values', () => {
                (() => {
                    obstacle.x2 = 'x2';
                }).should.throw(Error);
            });
        });

        describe('y2', () => {
            it('returns the value', () => {
                obstacle.y2.should.equal(50);
            });

            it('only accepts numerical values', () => {
                (() => {
                    obstacle.y2 = 'y2';
                }).should.throw(Error);
            });
        });

        describe('colour', () => {
            it('returns the value', () => {
                obstacle.colour.should.equal('#3ECAE8');
            });

            it('must be a string', () => {
                (() => {
                    obstacle.colour = 500;
                }).should.throw(Error);
            });

            it('must be a valid colour hex string', () => {
                (() => {
                    obstacle.colour = 'red';
                }).should.throw(Error);
            });
        });

        describe('angle', () => {
            it('returns the value', () => {
                // As it's a straight line horizontally, it should be 0
                obstacle.angle.should.equal(0);
            });
        });

        describe('point distance', () => {
            it('calculates distance correctly', () => {
                // Create an obstacle of length 10 and ensure length is 10
                obstacle = new Obstacle.BulletBlock(0, 0, 10, 0);
                obstacle.pointDistance(
                    obstacle.x1,
                    obstacle.y1,
                    obstacle.x2,
                    obstacle.y2
                ).should.equal(10);
            });
        });

        describe('(x1, y1) -> origin distance', () => {
            let dist1 = (o) => (o.pointDistance(o.x1, o.y1, 0, 0));
            let dist2 = (o) => (o.pointDistance(o.x2, o.y2, 0, 0));
            describe('should always be shorter than (x2, y2) -> origin distance', () => {
                it('is already', () => {
                    dist1(obstacle).should.be.below(dist2(obstacle));
                });

                it('will fix itself if they are the wrong way around', () => {
                    obstacle = new Obstacle.BulletBlock(100, 100, 0, 0);
                    obstacle.x1.should.equal(0);
                    obstacle.y1.should.equal(0);
                    obstacle.x2.should.equal(100);
                    obstacle.y2.should.equal(100);
                    dist1(obstacle).should.be.below(dist2(obstacle));
                });
            });
        });

        describe('collision', () => {
            it('correctly determines that three points are listed in counter clockwise order', () => {
                let a = {x: 0, y: 0}, b = {x: 5, y: 0}, c = {x: 0, y: 5};
                obstacle.ccw(a, b, c).should.not.equal(0); // > 0
                b.x = 0;
                b.y = 5;
                c.x = 5;
                c.y = 0;
                obstacle.ccw(a, b, c).should.not.equal(0); // < 0
                b.y = 0;
                c.x = 0;
                obstacle.ccw(a, b, c).should.equal(0); // < 0
            });

            it('correctly checks when lines are intersecting', () => {
                let a = {x: 0, y: 0}, b = {x: 20, y: 20}, c = {x: 20, y: 0}, d = {x: 0, y: 20};
                obstacle.intersection(a, b, c, d).should.equal(true);
            });

            describe('correctly checks for collisions with an object', () => {
                describe('already collidiing', () => {
                    it('top left - bottom right diagonal', () => {
                        let o = new Player(200, 200, 'Test', '#123456');
                        let obstacle = new Obstacle.BulletBlock(210, 190, 190, 210);
                        obstacle.checkCollision(o).should.equal(true);
                    });

                    it('top right - bottom left diagonal', () => {
                        let o = new Player(200, 200, 'Test', '#123456');
                        let obstacle = new Obstacle.BulletBlock(210, 190, 230, 210);
                        obstacle.checkCollision(o).should.equal(true);
                    });
                });

                it('will collide in its next frame', () => {
                    let o = new Player(210, 210, 'Test', '#123456');
                    let obstacle = new Obstacle.BulletBlock(199, 0, 199, 400);
                    o.move({keyCode: 37});
                    obstacle.checkCollision(o).should.equal(true);
                });
            });

            describe('correctly handles player collisions', () => {
                let o, obstacle;

                beforeEach(() => {
                    o = new Player(210, 210, 'Test', '#123456');
                    obstacle = new Obstacle.BulletBlock(199, 0, 199, 400);
                });
                it('calls the correct method on collision', () => {
                    o.move({keyCode: 37});
                    obstacle.checkPlayerCollision(o);
                });

                it('does nothing if no collision occurs', () => {
                    obstacle.checkPlayerCollision(o);
                });
            });

            describe('correctly handles bullet collisions', () => {
                let o, player, obstacle;

                beforeEach(() => {
                    player = new Player(210, 210, 'Test', '#123456');
                    o = new Bullet(210, 210, Math.PI, player, 0);
                    obstacle = new Obstacle.BulletBlock(199, 0, 199, 400);
                });

                it('calls the correct method on collision', () => {
                    obstacle.checkBulletCollision(o);
                });

                it('does nothing if no collision occurs', () => {
                    o.xChange *= -1;
                    obstacle.checkBulletCollision(o);
                });
            });
        });

        describe('reflection normal', () => {
            let obstacle, player;

            describe('> 45 degree angle should check E/W positioning', () => {
                beforeEach(() => {
                    player = new Player(200, 200, 'Test', '#123456');
                    obstacle = new Obstacle.BulletBlock(300, 0, 200, 400);
                });

                it('bullet east of obstacle', () => {
                    obstacle.angle.should.be.above(Math.PI / 4);
                    let bullet = new Bullet(100, 100, 0, player, 0);
                    obstacle.reflectionNormal(bullet).toString().should.equal(obstacle.rightNormal.toString());
                });

                it('bullet west of the obstacle', () => {
                    obstacle.angle.should.be.above(Math.PI / 4);
                    let bullet = new Bullet(400, 100, Math.PI, player, 0);
                    obstacle.reflectionNormal(bullet).toString().should.equal(obstacle.leftNormal.toString());
                });
            });

            describe('< 45 degree angle should check N/S positioning', () => {
                beforeEach(() => {
                    player = new Player(200, 200, 'Test', '#123456');
                    obstacle = new Obstacle.BulletBlock(0, 200, 400, 200);
                });

                it('bullet south of obstacle', () => {
                    obstacle.angle.should.be.below(Math.PI / 4);
                    let bullet = new Bullet(100, 300, 0, player, 0);
                    obstacle.reflectionNormal(bullet).toString().should.equal({x: 0, y: -1}.toString());
                });

                it('bullet north of the obstacle', () => {
                    obstacle.angle.should.be.below(Math.PI / 4);
                    let bullet = new Bullet(100, 100, Math.PI, player, 0);
                    obstacle.reflectionNormal(bullet).toString().should.equal({x: -0, y: 1}.toString());
                });
            });
        });
    });

    describe('Bullet Block', () => {
        let obstacle, player;

        beforeEach(() => {
            obstacle = new Obstacle.BulletBlock(0, 50, 50, 50);
            player = new Player(200, 200, 'Test', '#123456');
        });

        it('handles bullet collisions', () => {
            let bullet = new Bullet(20, 60, Math.PI / 2, player, 0);
            obstacle.onBulletCollision(bullet);
            bullet.bouncesRemaining.should.be.below(3);
            // Test for bullets moving down
            bullet = new Bullet(20, 40, (3 * Math.PI) / 2, player, 0);
            obstacle.onBulletCollision(bullet);
            bullet.bouncesRemaining.should.be.below(3);
        });

        it('does nothing to players', () => {
            player.x = 20;
            player.y = 62;
            player.move({keyCode: 38});
            obstacle.onPlayerCollision(player);
            // Never calls updatePosition so the instance has not moved
            player.y.should.equal(62);
        });
    });

    describe('Player Block', () => {
        let obstacle, player;

        beforeEach(() => {
            obstacle = new Obstacle.PlayerBlock(0, 50, 50, 50);
            player = new Player(20, 62, 'Test', '#123456');
            player.move({keyCode: 38});
        });

        it('handles player collisions', () => {
            obstacle.onPlayerCollision(player);
            player.y.should.equal(player.y - (2 * player.yChange));
        });

        it('does nothing to bullets', () => {
            let bullet = new Bullet(20, 60, Math.PI / 2, player, 0);
            obstacle.onBulletCollision(bullet);
            bullet.bouncesRemaining.should.equal(3);
        });
    });

    describe('All Block', () => {
        let obstacle, player;

        beforeEach(() => {
            obstacle = new Obstacle.AllBlock(0, 50, 50, 50);
            player = new Player(20, 62, 'Test', '#123456');
            player.move({keyCode: 38});
        });

        it('handles player collisions', () => {
            obstacle.onPlayerCollision(player);
            player.y.should.equal(player.y - (2 * player.yChange));
        });

        it('reflects bullets', () => {
            let bullet = new Bullet(20, 60, Math.PI / 2, player, 0);
            obstacle.onBulletCollision(bullet);
            bullet.bouncesRemaining.should.be.below(3);
            // Test for bullets moving down
            bullet = new Bullet(20, 40, (3 * Math.PI) / 2, player, 0);
            obstacle.onBulletCollision(bullet);
            bullet.bouncesRemaining.should.be.below(3);
        });
    });

    describe('Damage Block', () => {
        let obstacle, player;

        beforeEach(() => {
            obstacle = new Obstacle.DamageBlock(0, 50, 50, 50);
            player = new Player(20, 62, 'Test', '#123456', true);
            player.move({keyCode: 38});
        });

        it('damages player on collisions', () => {
            obstacle.onPlayerCollision(player);
            player.currentHealth.should.be.below(100);
        });

        it('will only damage local player', () => {
            player.local = false;
            obstacle.onPlayerCollision(player);
            player.currentHealth.should.equal(100);
        });

        it('destroys bullets', () => {
            let bullet = new Bullet(20, 60, Math.PI / 2, player, 0);
            obstacle.onBulletCollision(bullet);
            should.not.exist(player.bullets[0]);
        });
    });
});
