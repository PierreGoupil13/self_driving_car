class Car {
    constructor(x,y,width,height, canvas) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canva = canvas;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {
        this.#move();
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        } else if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if(this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            // C'est une sorte de cercle de trigo mais inversé, donc - pour la droite et + pour la gauche
            // borne droite -pi/2 borne gauche cest +pi/2
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
            if (this.controls.left) {
                this.angle+= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw() {
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath()
        ctx.fillRect(
            - this.width / 2,
            - this.height / 2,
            this.width, this.height);
        ctx.fill();

        ctx.restore();
    }

}