const obstacles = require('./obstacles');
const Player = require('./player').Player;

class Arena {
    constructor(canvas){
        const context = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;

        // Set up context
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = "10px Arial";
        context.lineWidth = 2;
        // Draw obstacles
        // Blue obstacle; players pass, bullets bounce
        let ob1 = new obstacles.BulletBlock(width/8, height/2, width/2, height/2);
        ob1.draw(context);
        // Green obstacle; bullets pass, players stop against it
        let ob2 = new obstacles.PlayerBlock(width/2, height/2, (7 * width)/8, height/2);
        ob2.draw(context);
        // Orange obstacle; bullets bounce, players stop
        let ob3 = new obstacles.AllBlock(width/2, 0, width/2, (3 * height)/8);
        ob3.draw(context);
        // Red obstacle; players take damage, bullets get destroyed
        let ob4 = new obstacles.DamageBlock(width/2, (5 * height)/8, width/2, height);
        ob4.draw(context);

        // Draw players
        let p1 = new Player(width/4, height/4, "crnbrdrck");
        p1.draw(context);

        let p2 = new Player((3*width)/4, (3*height)/4, "Gelo147");
        p2.draw(context);

        let p3 = new Player((3*width)/4, height/4, "MurkyFelix");
        p3.draw(context);

        let p4 = new Player(width/4, (3*height)/4, "The Twig");
        p4.draw(context);
    }
}

exports.Arena = Arena;