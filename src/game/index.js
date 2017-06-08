const obstacles = require(`${__dirname}/obstacles`);

class Arena {
    constructor(canvas){
        const context = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;

        context.lineWidth = 2;
        // Draw 4 lines in blue, green, orange, and red
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

        // Draw a player in the top left corner, we're gonna experiment with adding text
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = "10px Arial";
        context.fillRect((width/4)-10, (height/4)-10, 20, 20);
        context.fillText("100", (width/4)-10, (height/4)+20);
        context.fillText("3/3", (width/4)+10, (height/4)+20);
        context.fillText("crnbrdrck", width/4, (height/4)-13);
        context.fillRect(((3*width)/4)-10, ((3*height)/4)-10, 20, 20);
        context.fillText("100", ((3*height)/4)-10, ((3*height)/4)+20);
        context.fillText("3/3", ((3*height)/4)+10, ((3*height)/4)+20);
        context.fillText("Gelo147", (3*height)/4, ((3*height)/4)-13);
        context.fillRect(((3*width)/4)-10, (height/4)-10, 20, 20);
        context.fillText("100", ((3*width)/4)-10, (height/4)+20);
        context.fillText("3/3", ((3*width)/4)+10, (height/4)+20);
        context.fillText("MurkyFelix", (3*width)/4, (height/4)-13);
        context.fillRect((width/4)-10, ((3*height)/4)-10, 20, 20);
        context.fillText("100", (width/4)-10, ((3*height)/4)+20);
        context.fillText("3/3", (width/4)+10, ((3*height)/4)+20);
        context.fillText("TheTwig", width/4, ((3*height)/4)-13);
    }
}

exports.Arena = Arena;