const Obstacles = require('./obstacles');
const Player = require('./player').Player;
const MAX_PLAYERS = 4;

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

        requestAnimationFrame(() => {this.update()});
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
        this.obstacles.push(new Obstacles.BulletBlock(
            this.width / 2, this.height / 2, (7 * this.width) / 8, this.height / 2));
        this.obstacles.push(new Obstacles.BulletBlock(
            this.width / 2, 0, this.width / 2, (3 * this.height) / 8));
        this.obstacles.push(new Obstacles.BulletBlock(
            this.width / 2, (5 * this.height) / 8, this.width / 2, this.height));
    }

    setupPlayers() {
        // Draw players
        this.players.push(new Player(this.width / 4, this.height / 4, "crnbrdrck", "#3E75E8"));
        this.players.push(new Player((3 * this.width) / 4, (3 * this.height) / 4, "Gelo147", "#00FF80"));
        this.players.push(new Player((3 * this.width) / 4, this.height / 4, "MurkyFelix", "#FCFF00"));
        this.players.push(new Player(this.width / 4, (3 * this.height) / 4, "The Twig", "#FF4100"));
    }

    setupListeners() {
        // Create a click listener on the canvas, and keydown/up listeners on window
        this.canvas.addEventListener('click', (e) => {this.players[this.local].shoot(e)}, false);
        window.addEventListener('keydown', (e) => this.players[this.local].move(e), false);
        window.addEventListener('keyup', (e) => this.players[this.local].stop(e), false);
    }

    // Game Logic Methods

    update() {
        // Function run every tick
        this.draw();

        // Recall this function
        requestAnimationFrame(() => {this.update()});
    }

    draw() {
        // Draw the current state of the board
        this.context.clearRect(0, 0, this.width, this.height);
        this.players.forEach((player) => {
            player.draw(this.context);
        });
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(this.context);
        });
    }
}

exports.Arena = Arena;