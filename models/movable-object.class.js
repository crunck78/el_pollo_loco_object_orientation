class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    groundPos = 180;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this.isJumping()) { console.log("Is Jumping"); }
                if (this.isLanding()) { console.log("Is Landing"); }
                if (this.isInAir()) { console.log("Is in the Air"); }
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < this.groundPos;
    }

    isColliding(mo) {
        return this.isIntersectingX(mo) && this.isIntersectingY(mo);
    }

    isIntersectingY(mo) {
        return !this.isAbove(mo) &&
            !this.isBelow(mo);
    }

    isAbove(mo) {
        return !(this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop);
    }

    isBelow(mo) {
        return !(this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom);
    }

    isIntersectingX(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    isLeftSide(mo) {
        return !(this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft);
    }

    isRightSide(mo) {
        return !(this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight);
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    kill() {
        this.energy = 0;
    }

    playAnimation(images) {
        // let i = 7 % 6; => 1, Rest 1 
        let i = this.currentImage % images.length;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    changeDirection() {
        this.otherDirection = !this.otherDirection;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.currentImage = 0;
        this.speedY = 30;
    }

    isJumping() {
        return this.speedY > 0 && this.isAboveGround();
    }

    isLanding() {
        return this.speedY < 0 && this.isAboveGround();
    }

    isInAir() {
        return this.isJumping() || this.isLanding();
    }
}