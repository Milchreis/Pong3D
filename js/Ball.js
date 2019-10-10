class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius || 10;
        this.color = color(255, 255, 255);
        this.speedIncrease = 0.25;
        this.velocity = createVector(2, 4);
    }
    
    reset() {
        this.x = width/2;
        this.y = height/2;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.y <= 1 || this.y >= height) {
            this.velocity.y = this.velocity.y * -1;
        }
    }

    speedUp() {
        this.velocity.x = this.velocity.x < 0 ? this.velocity.x - this.speedIncrease : this.velocity.x + this.speedIncrease ;
        this.velocity.y = this.velocity.y < 0 ? this.velocity.y - this.speedIncrease : this.velocity.y +  this.speedIncrease;
    }

    checkCollision(paddle) {
        let hit = collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.size, this.x, this.y, 2*this.radius);
        if(hit) {
            this.velocity.x = this.velocity.x * -1;
            this.speedUp();
            this.update();
        }

        return hit;
    }

    render() {
        noStroke();
        ambientLight(100);
        ambientMaterial(this.color);
        
        push();
        translate(this.x, this.y);
        sphere(this.radius);
        pop();
    }
}