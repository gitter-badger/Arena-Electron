let chai = require('chai');
let path = require('path');

chai.should();

let Obstacle = require(path.join(__dirname, '..', 'src', 'game', 'obstacles'));

describe('Obstacle', () => {
    let obstacle;

    describe('Base Class Testing', () => {
        beforeEach(() => {
            // Straight vertical line
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
                // As it's a straight line up, it should be PI / 2
                obstacle.angle.should.equal(Math.PI / 2);
            })
        })

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

        // TODO - Collision testing when the Bullet class is implemented
    });
})
