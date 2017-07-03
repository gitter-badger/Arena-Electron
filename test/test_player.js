let chai = require('chai');
let path = require('path');

// We will be using `should` notation - options: should, expect, assert
chai.should();

let Player = require(path.join(__dirname, '..', 'src', 'game', 'player')).Player;

describe("Player", () => {
    let player;

    beforeEach(() => {
        player = new Player(200, 200, "Testy McTestface");
    });

    describe("x", () => {
        it("returns the value", () => {
            // Ensures the x value is correct
            player.x.should.equal(200);
        });

        it("can be moved in the x direction", () => {
            player.x += 10;
            player.x.should.equal(210);
        });

        it("only accepts numerical values", () => {
            (() => {
                player.x = "x";
            }).should.throw(Error);
        });
    });

    describe("y", () => {
        it("returns the value", () => {
            // Ensures the x value is correct
            player.y.should.equal(200);
        });

        it("can be moved in the x direction", () => {
            player.y += 10;
            player.y.should.equal(210);
        });

        it("only accepts numerical values", () => {
            (() => {
                player.y = "y";
            }).should.throw(Error);
        });
    });

    describe("username", () => {
        it("returns the value", () => {
            // Ensures the x value is correct
            player.username.should.equal("Testy McTestface");
        });

        it("can be changed", () => {
            let newName = 'New Test';
            player.username = newName;
            player.username.should.equal(newName);
        });

        it("only accepts string values", () => {
            (() => {
                player.username = 100;
            }).should.throw(Error);
        });
    });

    describe("health", () => {
        it("returns the value", () => {
            // Ensures the x value is correct
            player.currentHealth.should.equal(100);
        });

        it("can be changed", () => {
            player.currentHealth = 99;
            player.currentHealth.should.equal(99);
        });

        it("cannot be more than the max", () => {
            (() => {
                player.currentHealth = 200;
            }).should.throw(Error);
        });

        it("only accepts numeric values", () => {
            (() => {
                player.currentHealth = "Genji needs healing";
            }).should.throw(Error);
        });
    });

    describe("bullets", () => {
        it("returns the value", () => {
            // Ensures the x value is correct
            player.currentBullets.should.equal(3);
        });

        it("can be changed", () => {
            player.currentBullets = 1;
            player.currentBullets.should.equal(1);
        });

        it("cannot be more than the max", () => {
            (() => {
                player.currentBullets = 4;
            }).should.throw(Error);
        });

        it("only accepts numeric values", () => {
            (() => {
                player.currentBullets = "Reloading";
            }).should.throw(Error);
        });
    });

    describe("movement", () => {
        let playerSpeed = 4;
        describe("can move", () => {
            it("north with the w key", () => {
                let o = {keyCode: 87};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 - playerSpeed);
            });

            it("north with the up arrow", () => {
                let o = {keyCode: 38};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 - playerSpeed);
            });

            it("south with the s key", () => {
                let o = {keyCode: 83};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 + playerSpeed);
            });

            it("south with the down arrow", () => {
                let o = {keyCode: 40};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 + playerSpeed);
            });

            it("west with the a key", () => {
                let o = {keyCode: 65};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 - playerSpeed);
            });

            it("west with the left arrow", () => {
                let o = {keyCode: 37};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 - playerSpeed);
            });

            it("east with the d key", () => {
                let o = {keyCode: 68};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 + playerSpeed);
            });

            it("east with the right arrow", () => {
                let o = {keyCode: 39};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 + playerSpeed);
            });
        });

        describe("will stop when moving", () => {
            it("north with the w key", () => {
                let o = {keyCode: 87};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 - playerSpeed);
                player.updatePosition();
                player.y.should.equal(200 - (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.y.should.equal(200 - (2 * playerSpeed));
            });

            it("north with the up arrow", () => {
                let o = {keyCode: 38};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 - playerSpeed);
                player.updatePosition();
                player.y.should.equal(200 - (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.y.should.equal(200 - (2 * playerSpeed));
            });

            it("south with the s key", () => {
                let o = {keyCode: 83};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 + playerSpeed);
                player.updatePosition();
                player.y.should.equal(200 + (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.y.should.equal(200 + (2 * playerSpeed));
            });

            it("south with the down arrow", () => {
                let o = {keyCode: 40};
                player.move(o);
                player.updatePosition();
                player.y.should.equal(200 + playerSpeed);
                player.updatePosition();
                player.y.should.equal(200 + (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.y.should.equal(200 + (2 * playerSpeed));
            });

            it("west with the a key", () => {
                let o = {keyCode: 65};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 - playerSpeed);
                player.updatePosition();
                player.x.should.equal(200 - (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.x.should.equal(200 - (2 * playerSpeed));
            });

            it("west with the left arrow", () => {
                let o = {keyCode: 37};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 - playerSpeed);
                player.updatePosition();
                player.x.should.equal(200 - (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.x.should.equal(200 - (2 * playerSpeed));
            });

            it("east with the d key", () => {
                let o = {keyCode: 68};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 + playerSpeed);
                player.updatePosition();
                player.x.should.equal(200 + (2 * playerSpeed));
                player.stop(o);
                // Doesn't move any further
                player.x.should.equal(200 + (2 * playerSpeed));
            });

            it("east with the d key", () => {
                let o = {keyCode: 39};
                player.move(o);
                player.updatePosition();
                player.x.should.equal(200 + playerSpeed);
                player.updatePosition();
                player.x.should.equal(200 + (2 * playerSpeed));
                player.stop(o);
                player.x.should.equal(200 + (2 * playerSpeed));
            });
        });

        describe("can move diagonally", () => {
            it("north-east", () => {
                // -y + x - 87, 68
                player.move({keyCode: 87});
                player.move({keyCode: 68});
                player.updatePosition();
                player.x.should.equal(200 + playerSpeed);
                player.y.should.equal(200 - playerSpeed);
            });

            it("north-west", () => {
                // -y -x - 87, 65
                player.move({keyCode: 87});
                player.move({keyCode: 65});
                player.updatePosition();
                player.x.should.equal(200 - playerSpeed);
                player.y.should.equal(200 - playerSpeed);
            });

            it("south-east", () => {
                // +y +x - 83, 68
                player.move({keyCode: 83});
                player.move({keyCode: 68});
                player.updatePosition();
                player.x.should.equal(200 + playerSpeed);
                player.y.should.equal(200 + playerSpeed);
            });

            it("south-west", () => {
                // +y -x - 83, 65
                player.move({keyCode: 83});
                player.move({keyCode: 65});
                player.updatePosition();
                player.x.should.equal(200 - playerSpeed);
                player.y.should.equal(200 + playerSpeed);
            });
        });

        it("cannot move in both horizontal directions at once", () => {
            player.move({keyCode: 65});
            player.move({keyCode: 68});
            player.updatePosition();
            player.x.should.equal(200);
        });

        it("cannot move in both vertical directions at once", () => {
            player.move({keyCode: 87});
            player.move({keyCode: 83});
            player.updatePosition();
            player.y.should.equal(200);
        });
    });
});
