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
    playObjectTime;
    playAnimationElapse = 160;

    requestMove;
    moveOjectTime;

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
        if (this.moveOjectTime === undefined) {
            this.moveOjectTime = timeStamp;
        }
        this.requestMove = requestAnimationFrame(this.move.bind(this));
    }

    play(timeStamp) {
        if (this.playObjectTime === undefined) {
            this.playObjectTime = timeStamp;
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
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }
        this.requestGravity = requestAnimationFrame(this.gravity.bind(this));
    }

    isAboveGround() {
        return this.y < this.groundPos;
    }

    isLaunching() {
        return this.launching !== undefined && this.launching;
    }

    launch() {
        this.currentImage = 0;
        this.launching = true;
        setTimeout(() => { this.speedY = this.jumpVelocity; this.launching = false; this.groundPos = 160; }, 250); // give time for launch animation
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
        return this.speedY < 0 && this.isAboveGround(); // && this.landing !== undefined &&  this.landing;
    }

    isLanded() {
        //We only want to find when it hits the ground
        //return this.speedY + this.acceleration + this.y < this.groundPos;
        //return this.speedY <= 0 && !this.isAboveGround();
        return this.landed !== undefined && this.landed;
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
        return this.x + this.offset.left;
    }

    getRightPos() {
        return this.x + this.width - this.offset.right;
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
        return this.y + this.offset.top;
    }

    getBottomPos() {
        return this.y + this.height - this.offset.bottom;
    }

    isStamping(mo) {
        //most  likely to stamp an enemy
        // not exactly but does the job ... is just a soft simulation, not real life
        return this.isLanding() && this.getBottomPos() - mo.getTopPos() <= 11; //Tolerance
    }

    canHit() {
        //Logic and Time Controlled?
    }

    isHit() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    hit() {
        this.currentImage = 0;
        this.energy -= 20;
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
        //TIME CONTROLLED
        throw new Error('You have to implement the method isAttack!');
    }

    canAttack() {
        //TIME CONTROLLED
        throw new Error('You have to implement the method canAttack!');
    }

    attack() {
        // throw new Error('You have to implement the method attack!');
        this.currentImage = 0;
    }

    isMoving() {
        return this.isMovingRight() || this.isMovingLeft();
    }

    isMovingLeft() {
        throw new Error('You have to implement the method isMovingLeft!');
    }

    isMovingRight() {
        throw new Error('You have to implement the method isMovingRight!');
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

    distanceFromX(mo) {
        if (this.isLeftSide(mo)) {
            return mo.getLeftPos() - this.getRightPos();
        }

        if (this.isRightSide(mo)) {
            return this.getLeftPos() - mo.getRightPos();
        }

        return 0; // means they are intersectingX
    }
}