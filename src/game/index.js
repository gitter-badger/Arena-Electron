

class Arena {
    constructor(canvas){
        const context = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;

        context.lineWidth = 2;
        // Draw 4 lines in blue, green, orange, and red
        // Blue obstacle; players pass, bullets bounce
        context.strokeStyle = '#3ECAE8';
        context.beginPath();
        context.moveTo(width/8, height/2);
        context.lineTo(width/2, height/2);
        context.stroke();
        // Green obstacle; bullets pass, players stop against it
        context.strokeStyle = '#00FF00';
        context.beginPath();
        context.moveTo(width/2, height/2);
        context.lineTo((7 * width)/8, height/2);
        context.stroke();
        // Orange obstacle; bullets bounce, players stop
        context.strokeStyle = '#FF8300';
        context.beginPath();
        context.moveTo(width/2, 0);
        context.lineTo(width/2, (3 * height)/8);
        context.stroke();
        // Red obstacle; players take damage, bullets get destroyed
        context.strokeStyle = '#FF003F';
        context.beginPath();
        context.moveTo(width/2, (5 * height)/8);
        context.lineTo(width/2, height);
        context.stroke();

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