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
    
    requestPlay;
    playObjectTime;
    playAnimationElapse = 160;

    requestMove;
    moveOjectTime;
    moveAnimationElapse = 160;

    requestGravity;
    gravityTime;
    gravityAnimationElapse = 160;

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

    /**
     * Start move and play animation Frame
     */
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

    /**
     * Stop move and play animation Frame
     */
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

    /**
     * @param {number} timeStamp 
     */
    move(timeStamp) {
        if (this.moveOjectTime === undefined) {
            this.moveOjectTime = timeStamp;
        }
        this.requestMove = requestAnimationFrame(this.move.bind(this));
    }

    /**
     * 
     * @param {number} timeStamp 
     */
    play(timeStamp) {
        if (this.playObjectTime === undefined) {
            this.playObjectTime = timeStamp;
        }
        this.requestPlay = requestAnimationFrame(this.play.bind(this));
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
        if (elapse >= FRAMES_TIME) {
            this.gravityTime = timeStamp;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;

                if(!(this.isAboveGround() || this.speedY > 0)){
                   this.land(); //Works for Character. Fix for others Classes to!!!
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
    }

    /**
     * FIX GROUND POS TO WORK FOR ALL CLASSES OR MOVE METHOD TO CHARACTER
     */
    launch() {
        this.currentImage = 0;
        this.launching = true;
        setTimeout(() => { this.jump(); this.launching = false; this.groundPos = 171; }, 250); // give time for launch animation
    }

    isInAir() {
        return this.isJumping() || this.isLanding();
    }

    isJumping() {
        return this.speedY > 0 && this.isAboveGround();
    }

    jump(){
        this.speedY = this.velocityY;
    }

    isMitAir() {
        return this.isAboveGround() && !(this.isJumping() || this.isLanding());
    }

    isLanding() {
        return this.speedY < 0 && this.isAboveGround(); // && this.landing !== undefined &&  this.landing;
    }

    land() {
        this.y = this.groundPos;
        this.currentImage = 0;
        this.landed = true;
        setTimeout(() => { this.landed = false; }, 250); // give time for landing animation
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