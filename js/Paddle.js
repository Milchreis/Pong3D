class Paddle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size || 10;
        this.points = 0;
        this.width = 15;
        this.speed = 10;
        this.speedIncrease = 0.25;
        this.color = color(255, 255, 255);
    }

    up() {
        if(this.y > 0)
            this.y -= this.speed;
    }
    
    down() {
        if(this.y+this.size < height)
            this.y += this.speed;
    }

    speedUp() {
        this.speed += this.speedIncrease;
    }

    update(ball) {
        if(!ball) {
            return;
        } else {
            this.speed = 8;
        }

        if(ball.velocity.x < 0 && ball.y > this.y+this.size/2) {
            this.down();
        }
        
        if(ball.velocity.x < 0 && ball.y < this.y+this.size/2) {
            this.up();
        }

    }

    render() {
        noStroke();
        ambientLight(100);
        ambientMaterial(this.color);
        
        push();
        translate(this.x+this.width/2, this.y+this.size/2);
        box(this.width, this.size, this.width);
        pop();
    }
}