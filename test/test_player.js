/**
 * Created by ciaran on 30/06/17.
 */
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

    describe("x value", () => {
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

    describe("y value", () => {
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

    describe("username value", () => {
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

    describe("health value", () => {
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

    describe("bullets value", () => {
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
});