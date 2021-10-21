class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    groundPos = 180;

    playInterval;
    moveInterval;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                // if (this.isJumping()) { console.log("Is Jumping"); }
                // if (this.isLanding()) { console.log("Is Landing"); }
                // if (this.isInAir()) { console.log("Is in the Air"); }
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    animate(){
        this.startMove();
        this.startPlay();
    }

    startPlay(){
        this.playInterval = setInterval(this.play.bind(this), 154); //TODO different intervals
    }

    stopPlay(){
        clearInterval(this.playInterval);
    }

    startMove(){
        this.moveInerval = setInterval(this.move.bind(this), 1000 / 60);
    }

    stopMove(){
        clearInterval(this.moveInterval);
    }

    move(){
        throw new Error('You have to implement the method move!');
    }

    play(){
        throw new Error('You have to implement the method play!');
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
        return !(this.getBottomPos() > mo.getTopPos());
    }

    isBelow(mo) {
        return !(this.getTopPos() < mo.getBottomPos());
    }

    isStamping(mo){
        //most  likely to stamp an enemy
        // not exactly but does the job ... is just a soft simulation, not real life
        return this.isLanding() && this.getBottomPos() - mo.getTopPos() <= 2.6; //Tolerance
    }

    getTopPos() {
        return this.y + this.offsetTop;
    }

    getBottomPos() {
        return this.y + this.height - this.offsetBottom;
    }

    isIntersectingX(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    isLeftSide(mo) {
        return !(this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft);
    }

    isRightSide(mo) {
        return !(this.getLeftPos() < mo.getRightPos());
    }

    getLeftPos() {
        return this.x + this.offsetLeft;
    }

    getRightPos() {
        return this.x + this.width - this.offsetRight;
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

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
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