class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    groundPos = 180;

    speedY = 0;
    jumpVelocity = 20;
    acceleration = 1;

    changeDirectionTime = 5000;

    requestPlay;
    playTime;
    playAnimationElapse = 154;

    requestMove;
    moveTime;

    requestGravity;
    gravityTime;

    playAnimation(timeStamp, images) {
        if (this.playAnimationTime === undefined) {
            this.playAnimationTime = timeStamp;
        }
        const elapse = timeStamp - this.playAnimationTime;
        if (elapse > this.playAnimationElapse) {
            this.playAnimationTime = timeStamp;
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    animate() {
        this.startMove();
        this.startPlay();
    }

    startMove() {
        this.requestMove = requestAnimationFrame(this.move.bind(this));
    }

    startPlay() {
        this.requestPlay = requestAnimationFrame(this.play.bind(this));
    }

    stopAnimate() {
        this.stopMove();
        this.stopPlay();
    }

    stopMove() {
        cancelAnimationFrame(this.requestMove);
    }

    stopPlay() {
        cancelAnimationFrame(this.requestPlay);
    }

    move(timeStamp) {
        if (this.moveTime === undefined) {
            this.moveTime = timeStamp;
        }
        this.requestMove = requestAnimationFrame(this.move.bind(this));
    }

    play(timeStamp) {
        if (this.playTime === undefined) {
            this.playTime = timeStamp;
        }
        this.requestPlay = requestAnimationFrame(this.play.bind(this));
    }

    startDirectionChange() {
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), this.changeDirectionTime);
    }

    stopDirectionChange() {
        clearInterval(this.changeDirectionInterval);
    }

    changeDirection() {
        this.otherDirection = !this.otherDirection;
    }

    startGravity() {
        this.requestGravity = requestAnimationFrame(this.gravity.bind(this));
    }

    stopGravity() {
        cancelAnimationFrame(this.requestGravity);
    }

    gravity(timeStamp) {
        if (this.gravityTime === undefined) {
            this.gravityTime = timeStamp;
        }

        const elapse = timeStamp - this.gravityTime;
        if (elapse > FRAMES_TIME) {
            this.gravityTime = timeStamp;
            //DO NOT DELETE.....
            // if (this.isLaunching()) {
            //     console.log("Is Launching");
            //     this.handleLaunching();
            // }
            // if (this.isInAir()) { console.log("Is in the Air"); }
            // if (this.isJumping()) { console.log("Is Jumping"); }
            // if (this.isMitAir()) { console.log("Is Mid Air"); }
            // if (this.isLanding()) { console.log("Is Landing"); }
            // console.log("Gravity is Running!");
            if (this.isAboveGround() || this.speedY > 0) {


                //calculate what will come next and predict landing
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this.isLanded()) {
                    //console.log("Has Landed");
                    this.handleLanding();
                }
            }
        }
        this.requestGravity = requestAnimationFrame(this.gravity.bind(this));
    }

    isAboveGround() {
        return this.y < this.groundPos;
    }

    isLaunching() {
        return this.launching !== undefined && this.launching;
        return !this.isAboveGround() && (this.speedY > 0 || this.speedY == this.jumpVelocity);
    }

    launch() {
        this.currentImage = 0; // presumes that launch only fires after 
        this.lauching = true;
        setTimeout(() => { this.speedY = this.jumpVelocity; this.launching = false }, 250); // give time for lauch animation
    }

    isInAir() {
        return this.isJumping() || this.isLanding();
    }

    isJumping() {
        return this.speedY > 0 && this.isAboveGround();
    }

    isMitAir() {
        return this.isAboveGround() && !(this.isJumping() || this.isLanding());
    }

    isLanding() {
        return this.speedY < 0 && this.isAboveGround();
    }

    isLanded() {
        //We only want to find when it hits the ground
        return this.speedY <= 0 && !this.isAboveGround(); // Only valid inside gravity after calculation
    }

    handleLanding() {

    }

    handleLaunching() {

    }

    isColliding(mo) {
        return this.isIntersectingX(mo) && this.isIntersectingY(mo);
    }

    isIntersectingX(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    isLeftSide(mo) {
        return !(this.getRightPos() > mo.getLeftPos());
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

    isIntersectingY(mo) {
        return !(this.isAbove(mo) || this.isBelow(mo));
    }

    isAbove(mo) {
        return !(this.getBottomPos() > mo.getTopPos());
    }

    isBelow(mo) {
        return !(this.getTopPos() < mo.getBottomPos());
    }

    getTopPos() {
        return this.y + this.offsetTop;
    }

    getBottomPos() {
        return this.y + this.height - this.offsetBottom;
    }

    isStamping(mo) {
        //most  likely to stamp an enemy
        // not exactly but does the job ... is just a soft simulation, not real life
        return this.isLanding() && this.getBottomPos() - mo.getTopPos() <= 4; //Tolerance
    }

    canHit() {
        //Logic and Time Controled?
    }

    isHit() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    hit() {
        this.currentImage = 0;
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isKilled() {
        return this.energy == 0;
    }

    kill() {
        this.currentImage = 0;
        this.energy = 0;
    }

    isAttacking() {
        //TIME CONTROLED
        throw new Error('You have to implement the method canAttack!');
    }

    canAttack() {
        //TIME CONTROLED
        throw new Error('You have to implement the method canAttack!');
    }

    attack() {
        // throw new Error('You have to implement the method attack!');
        this.currentImage = 0;
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
}