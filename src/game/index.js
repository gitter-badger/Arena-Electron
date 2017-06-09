const Obstacles = require('./obstacles');
const Player = require('./player').Player;
const FPS = 60;
const UPDATE_TIME = 1000 / FPS;

class Arena {
    constructor(canvas){
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.players = [];
        this.obstacles = [];

        // Set up context
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.font = "10px Arial";
        this.context.lineWidth = 2;
        // Set up obstacles
        this.setupObstacles();
        // Set up Players
        this.setupPlayers();

        setInterval(() => { this.update(); }, UPDATE_TIME);
    }

    setupObstacles() {
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
        this.players.push(new Player(this.width / 4, this.height / 4, "crnbrdrck"));
        this.players.push(new Player((3 * this.width) / 4, (3 * this.height) / 4, "Gelo147"));
        this.players.push(new Player((3 * this.width) / 4, this.height / 4, "MurkyFelix"));
        this.players.push(new Player(this.width / 4, (3 * this.height) / 4, "The Twig"));
    }

    update() {
        // Function run every tick
        this.draw();
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