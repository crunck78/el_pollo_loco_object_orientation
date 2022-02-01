/**
 * An extension of DrawableObject Construct that can be animated inside a 2d Canvas Context.
 */
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

    /**
     * A long integer value, the request id, that uniquely identifies the entry in the callback list.
     *  This is a non-zero value, but you may not make any other assumptions about its value.
     *  You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
     * @type {number}
     */
    requestPlay;

    /**
     * Measuring time passing variable in ms for running code inside recursive @function play
     * only after at least this amount off time has passed. ( replaced By FRAMES_TIME @global )
     * @type {number}
     */
    playObjectTime;

    /**
     * Measuring time passing variable in ms, for how long should one image be drawn
     * @type {number}
     */
    playAnimationElapse = 160;

    /**
     * A long integer value, the request id, that uniquely identifies the entry in the callback list.
     *  This is a non-zero value, but you may not make any other assumptions about its value.
     *  You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
     * @type {number}
     */
    requestMove;

    /**
     * Measuring time passing variable in ms for running code inside recursive @function move
     * only after at least this amount off time has passed. ( replaced By FRAMES_TIME @global )
     * @type {number}
     */
    moveOjectTime;

    /**
     * @type {number}
     */
    moveAnimationElapse = 160;

    /**
     * A long integer value, the request id, that uniquely identifies the entry in the callback list.
     *  This is a non-zero value, but you may not make any other assumptions about its value.
     *  You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
     * @type {number}
     */
    requestGravity;

    /**
     * Measuring time passing variable in ms for running code inside recursive @function gravity
     * only after at least this amount off time has passed. ( replaced By FRAMES_TIME @global )
     * @type {number}
     */
    gravityTime;

    /**
     * @type {number}
     */
    gravityAnimationElapse = 160;

    /**
     * Control flag to determine if this instance is performing launch animation.
     * @type {boolean}
     */
    launching;

    /**
     * Control flag to determine If this instance is performing ground touch animation
     * @type {boolean}
     */
    landed;

    /**
     * Queries an image from @member imageCache as the next image to be drawn
     * only if @member playAnimationElapse time passed.
     * @param {number} timeStamp
     * @param {string[]} images - a collection of image paths that have been loaded with @method loadImages to @member imageCache
     */
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
     * Wrapper @function animate , starts the recursive @function move and @function play
     */
    animate() {
        this.startMove();
        this.startPlay();
    }

    /**
     * Starts the recursive @function move
     */
    startMove() {
        this.requestMove = requestAnimationFrame(this.move.bind(this));
    }

    /**
     * Starts the recursive @function play
     */
    startPlay() {
        this.requestPlay = requestAnimationFrame(this.play.bind(this));
    }

    /**
     * Wrapper @function stopAnimate, cancels the recursion @function move and @function play
     */
    stopAnimate() {
        this.stopMove();
        this.stopPlay();
    }

    /**
     * Stops the recursive @function move 
     */
    stopMove() {
        cancelAnimationFrame(this.requestMove);
    }

    /**
     * Stops the recursive @function play
     */
    stopPlay() {
        cancelAnimationFrame(this.requestPlay);
    }

    /**
     * This is used to recall the Child Class overridden @method move.
     * @param {number} timeStamp 
     */
    move(timeStamp) {
        if (this.moveOjectTime === undefined) {
            this.moveOjectTime = timeStamp;
        }
        this.requestMove = requestAnimationFrame(this.move.bind(this));
    }

    /**
     * This is used to recall the Child Class overridden @method play.
     * @param {number} timeStamp 
     */
    play(timeStamp) {
        if (this.playObjectTime === undefined) {
            this.playObjectTime = timeStamp;
        }
        this.requestPlay = requestAnimationFrame(this.play.bind(this));
    }

    /**
     * Starts the recursive @function gravity
     */
    startGravity() {
        this.requestGravity = requestAnimationFrame(this.gravity.bind(this));
    }

    /**
     * Stops the recursive @function gravity
     */
    stopGravity() {
        cancelAnimationFrame(this.requestGravity);
    }

    /**
     * Self recalling function, calling @method applyGravity only after @constant FRAMES_TIME has passed.
     * @param {number} timeStamp 
     */
    gravity(timeStamp) {
        if (this.gravityTime === undefined) {
            this.gravityTime = timeStamp;
        }
        const elapse = timeStamp - this.gravityTime;
        if (elapse > FRAMES_TIME) {
            this.gravityTime = timeStamp;
            this.applyGravity();
        }
        this.requestGravity = requestAnimationFrame(this.gravity.bind(this));
    }

    /**
     * Simulates Vertical Projectile motion,
     *  if this instance isAboveGround or @member speedY greater then 0,
     */
    applyGravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.accelerationY;
            //This only has to happen once every time this instance after been launched, then landes.
            if (!(this.isAboveGround() || this.speedY > 0)) {
                this.land();
            }
        }
    }

    /**
     * If this instance @member y is less then this instance @member groundPos
     * @returns {boolean}
     */
    isAboveGround() {
        return this.y < this.groundPos;
    }

    /**
     * @param {number} groundPos - new groundPos
     */
    launch(groundPos) {
        this.currentImage = 0;
        this.launching = true;
        setTimeout(() => { this.jump(groundPos); }, 250); // give time for launch animation
    }

    /**
     * If this instance is jumping or landing or in mit air.
     * @returns {boolean}
     */
    isInAir() {
        return this.isJumping() || this.isLanding() || this.isMitAir();
    }

    /**
    * The time when simulating vertical projectile motion inside @method applyGravity,
    * the vertical position is increasing in conventional coordinate systems
    * @returns {boolean}
    */
    isJumping() {
        return this.speedY > 0 && this.isAboveGround();
    }

    /**
     * Triggers @method gravity if it is started to call @method applyGravity
     * @param {number} groundPos - new groundPos
     */
    jump(groundPos) {
        this.launching = false; this.groundPos = groundPos ? groundPos : 171;
        this.speedY = this.velocityY;
    }

    /**
     * The time when max point is achieved when simulating vertical projectile motion inside @method applyGravity 
     * @returns {boolean}
     */
    isMitAir() {
        return this.isAboveGround() && !(this.isJumping() || this.isLanding());
    }

    /**
     * The time when simulating vertical projectile motion inside @method applyGravity,
     * the vertical position is decreasing in conventional coordinate systems
     * @returns {boolean}
     */
    isLanding() {
        return this.speedY < 0 && this.isAboveGround(); // && this.landing !== undefined &&  this.landing;
    }

    /**
     * Sets @member landed as true for 250 ms timeout.
     */
    land() {
        this.y = this.groundPos;
        this.currentImage = 0;
        this.landed = true;
        setTimeout(() => { this.landed = false; }, 250); // give time for landing animation
    }

    /**
     * If this instance is moving in any direction lef, right, up or down
     * @returns {boolean}
     */
    isMoving() {
        return this.isMovingVertically() || this.isMovingHorizontally();
    }

    isMovingVertically(){
        return this.isMovingUp() || this.isMovingDown();
    }

    isMovingHorizontally(){
        return this.isMovingRight() || this.isMovingLeft();
    }

    isMovingLeft() {
        throw new Error('You have to implement the method isMovingLeft!');
    }

    isMovingRight() {
        throw new Error('You have to implement the method isMovingRight!');
    }

    isMovingUp() {
        throw new Error('You have to implement the method isMovingLeft!');
    }

    isMovingDown() {
        throw new Error('You have to implement the method isMovingRight!');
    }

    /**
     * Add to this instance @member x, this instance @member speedX 
     */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * Subtract from this instance @member x, this instance @member speedX
     */
    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * Subtract from this instance @member y, this instance @member speedY
     */
    moveUp() {
        this.y -= this.speedX;
    }

    /**
     * Add to this instance @member y, this instance @member speedY
     */
    moveDown() {
        this.y += this.speedX;
    }
}