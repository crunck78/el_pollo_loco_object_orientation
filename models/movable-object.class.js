class MovableObject extends DrawableObject {
    /**
     * @type {number} - Horizontal Speed Movement
     */
    speedX = 0.15;
    
    /**
     * @type {number} - Vertical Position for Gravity to Measure distance relative to ground
     */
    groundPos = 180;

    /**
     * @type {number} - Vertical Speed Movement
     */
    speedY = 0;

    /**
     * @type {number} - Vertical Velocity
     */
    velocityY = 20;

    /**
     * @type {number} - Vertical Acceleration, Gravity
     */
    accelerationY = 1;

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
        const elapse = Math.floor(Math.max(timeStamp) - Math.max(this.gravityTime));
        //console.log("Gravity Elapse: ", elapse);
        if (elapse >= FRAMES_TIME) {
            //console.log("Gravity Elapse: ", elapse);
            this.gravityTime = timeStamp;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
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
        setTimeout(() => { this.speedY = this.velocityY; this.launching = false; this.groundPos = 160; }, 250); // give time for launch animation
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
        //return this.speedY + this.accelerationY + this.y < this.groundPos;
        //return this.speedY <= 0 && !this.isAboveGround();
        return this.landed !== undefined && this.landed;
    }

    isAttacking() {
        //TIME CONTROLLED
        throw new Error('You have to implement the method isAttacking!');
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
}