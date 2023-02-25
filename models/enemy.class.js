/**
 * An extension of NPC, defines some self behavior as an Enemy to Character
 */
class Enemy extends NPC {

    /**
     * Holds the last distance between this instance and a Character instance,
     * after  Character has alerted this instance
     * @type {number}
     */
    alertDistance = 200;

    /**
     * Control flag, if this instance is alerted.
     * @type {boolean}
     */
    alerted = false;

    /**
     * Holds the last Horizontal position of the Character instance after it has last alerted this instance.
     * @type {number | undefined}
     */
    lastAlertPosition = undefined;

    /**
     * Holds the last Horizontal position of this instance after it has last been alerted.
     * @type {number | undefined}
     */
    lastPosX = undefined;

    /**
     * How far in the Horizontal direction should this instance  move.
     * @type {number}
     */
    patrolDistance = 500;

    /**
     * Control flag, if this instance has reached @member lastAlertPosition
     * @type {boolean}
     */
    reachedTarget = false;

    /**
     * @override @function animate
     */
    animate() {
        super.startGravity();
        super.animate();
    }

    /**
     * @override @function stopAnimate
     */
    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    /**
     *
     * @param {number} timeStamp
     */
    moveEnemy(timeStamp) {
        if (this.canPatrol()) { this.patrol() }
    }

    /**
     * Control @function canPatrol , check if this instance is able to patrol
     * @returns {boolean}
     */
    canPatrol() {
        return !(this.alerted || super.isHit() || this.attacking);
    }

    /**
     * @function patrol
     */
    patrol() {
        if (this.lastAlertPosition && !this.reachedTarget) { //there is a last alert pos reached it,
            if (this.changeDirectionInterval) { this.stopDirectionChange(); } //stop the change direction if its started,
            // stop movement
            this.movingRight = false;
            this.movingLeft = false;
            if (this.x < this.lastAlertPosition) {
                this.moveRight();
                if (this.x >= this.lastAlertPosition) {
                    this.reachedTarget = true;
                    this.lastAlertPosition = undefined;
                    this.movingRight = false;
                    this.movingLeft = false;
                }
            }
            else if (this.x > this.lastAlertPosition) {
                if (this.x <= this.lastAlertPosition) {
                    this.reachedTarget = true;
                    this.lastAlertPosition = undefined;
                    this.movingRight = false;
                    this.movingLeft = false;
                }
                this.moveLeft();
            }
        } else { // there is no last alert pos, just move around from one point to other, or just stay still or idle or sleep
            if (this.changeDirectionInterval) { this.startDirectionChange(); }

        }
    }

    /**
     * @override @function moveLeft
     */
    moveLeft() {
        this.otherDirection = false;
        this.movingRight = false;
        this.movingLeft = true;
        super.moveLeft();
    }

    /**
     *  @override @function moveRight
     */
    moveRight() {
        this.otherDirection = true;
        this.movingRight = true;
        this.movingLeft = false;
        super.moveRight();
    }

    /**
     * @override @function changeDirection
     */
    changeDirection() {
        if (!super.isKilled()) {
            super.changeDirection();
        }
    }

    /**
     * Control @function canMove , check if this instance is able to move
     * @returns {boolean}
     */
    canMove() {
        return !(this.alerted || super.isHit() || this.attacking);
    }

    /**
     * Control @function canAttack , check if this instance is able to perform some attack
     * @returns {boolean}
     */
    canAttack() {
        return !(super.isKilled() || this.alerted || super.isHit() || this.attacking);
    }

    /**
     * Triggers attack action for some given timeout in milliseconds.
     * @param {number} timeStamp
     */
    attack(timeStamp) {
        this.attacking = true;
        setTimeout(() => { this.attacking = false }, (8 * 300)); //attack images length times animationElapse pro attack image
    }

    /**
     * Control @function canAlert, check if this intance is able to be alerted.
     * @returns {boolean}
     */
    canAlert() {
        return !(super.isKilled() || this.alerted || this.attacking || super.isHit());
    }

    /**
     * Triggers alert action for some given timeout in milliseconds.
     * @param {Character} target
     * @param {number} timeStamp
     */
    alert(target, timeStamp) {
        this.lastAlertPosition = target.x;
        this.otherDirection = target.otherDirection; // this is wrong should check if @this is left or right side from target. TODO
        this.reachedTarget = false;
        this.lastPosX = this.x;
        this.alerted = true;
        // this.lastAlert = new Date().getTime();
        //console.log("ALERT");
        setTimeout(() => { this.alerted = false; if (this.canAttack()) { this.attack(); } }, (8 * 300)); //alert images length times animationElapse pro alert image
    }

    // /**
    //  * @override @function kill
    //  * @param {string} method - how was it killed? STAMP (Character Stamped onver head) | KILL (energy = 0)
    //  */
    // kill(method) {
    //     if (method && method == 'STAMP' || method == 'KILL') {
    //         this.AUDIOS[method].play();
    //     }
    //     super.kill();
    // }

    /**
     *
     * @param {CollidableObject} target - the object that hits this instance
     */
    hit(target) {
        super.hit(target.damage);
    }
}