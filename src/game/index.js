const Obstacles = require('./obstacles');
const Player = require('./player').Player;

class Arena {
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.players = [];
        this.obstacles = [];
        this.local = 0;

        // Set up context
        this.context.textAlign = 'center';
        this.context.font = "10px Arial";
        this.context.lineWidth = 2;
        // Set up obstacles
        this.setupObstacles();
        // Set up Players
        this.setupPlayers();
        // Set up Listeners
        this.setupListeners();

        requestAnimationFrame(() => {this.update();});
    }

    // Setup methods

    setupObstacles() {
        // Place obstacles as the walls as well to avoid special handling
        this.obstacles.push(new Obstacles.AllBlock(
            -1, -1, this.width + 1, -1)); // Top
        this.obstacles.push(new Obstacles.AllBlock(
            -1, this.height + 1, this.width + 1, this.height + 1)); // Bottom
        this.obstacles.push(new Obstacles.AllBlock(
            -1, -1, -1, this.height + 1)); // Left
        this.obstacles.push(new Obstacles.AllBlock(
            this.width + 1, -1, this.width + 1, this.height + 1)); // Right
        // Change this to load data from the server first
        this.obstacles.push(new Obstacles.BulletBlock(
            this.width / 8, this.height / 2, this.width / 2, this.height / 2));
        this.obstacles.push(new Obstacles.PlayerBlock(
            this.width / 2, this.height / 2, (7 * this.width) / 8, this.height / 2));
        this.obstacles.push(new Obstacles.AllBlock(
            this.width / 2, 0, this.width / 2, (3 * this.height) / 8));
        this.obstacles.push(new Obstacles.DamageBlock(
            this.width / 2, (5 * this.height) / 8, this.width / 2, this.height));
        // Add some angled obstacles for completeness sake
        this.obstacles.push(new Obstacles.BulletBlock(
            this.width / 8, 0, 0, this.height / 8));
        this.obstacles.push(new Obstacles.BulletBlock(
            (7 * this.width) / 8, 0, this.width, this.height / 4));
        this.obstacles.push(new Obstacles.BulletBlock(
            0, (7 * this.height) / 8, this.width / 4, this.height));
        this.obstacles.push(new Obstacles.BulletBlock(
            (7 * this.width) / 8, this.height, this.width, (7 * this.height) / 8));
    }

    setupPlayers() {
        // Draw players
        this.players.push(new Player(this.width / 4, this.height / 4, "crnbrdrck", "#3E75E8", true));
        this.players.push(new Player((3 * this.width) / 4, (3 * this.height) / 4, "Gelo147", "#00FF80"));
        this.players.push(new Player((3 * this.width) / 4, this.height / 4, "MurkyFelix", "#FCFF00"));
        this.players.push(new Player(this.width / 4, (3 * this.height) / 4, "The Twig", "#FF4100"));
    }

    setupListeners() {
        // Create a click listener on the canvas, and keydown/up listeners on window
        this.canvas.addEventListener('click', (e) => this.players[this.local].shoot(e, this.canvas), false);
        window.addEventListener('keydown', (e) => this.players[this.local].move(e), false);
        window.addEventListener('keyup', (e) => this.players[this.local].stop(e), false);
    }

    // Game Logic Methods

    update() {
        // Function run every tick
        this.draw();
        this.checkCollisions();

        // Recall this function
        requestAnimationFrame(() => {this.update();});
    }

    draw() {
        // Draw the current state of the board
        this.context.clearRect(0, 0, this.width, this.height);
        this.players.forEach((player) => {
            if (player.alive) player.draw(this.context);
        });
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(this.context);
        });
    }

    checkCollisions() {
        // For each player, check their bullets have hit other players, then check obstacles
        // Ensure each player is only checked once
        let playerChecked;
        this.players.forEach((p) => {
            if (p !== this.players[this.local]) this.players[this.local].checkPlayerCollision(p);
            playerChecked = false;
            p.bullets.forEach((b) => {
                if(b !== null && p.local) b.checkPlayerCollision(this.players);
                this.obstacles.forEach((o) => {
                    if (!playerChecked) {
                        o.checkPlayerCollision(p);
                    }
                    if (b !== null) o.checkBulletCollision(b);
                });
            });
            playerChecked = true;
        });
    }
}

exports.Arena = Arena;
