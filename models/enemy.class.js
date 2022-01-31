class Enemy extends NPC {

    alertDistance = 200;
    alerted = false;
    attacking = false;
    lastAlertPosition = undefined;
    lastPosX = undefined;
    patrolDistance = 500;
    reachedTarget = false;

    animate() {
        super.startGravity();
        super.animate();
    }

    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    // move(timeStamp) {
    //     if (this.moveEnemyTime === undefined) {
    //         this.moveEnemyTime = timeStamp;
    //     }
    //     const elapse = timeStamp - this.moveEnemyTime;
    //     if (elapse > FRAMES_TIME) {
    //         this.moveEnemyTime = timeStamp;
    //         this.moveEnemy(timeStamp);
    //     }
    //     super.move(timeStamp);
    // }

    moveEnemy(timeStamp) {
        if (this.canPatrol()) { this.patrol() }
    }

    // canSearch(){
    //     return !(this.alerted || super.isHit() || this.attacking);
    // }

    // search(){
    //     if(this.lastAlertPosition ){

    //     }else{
    //         this.patrol();
    //     }
    // }

    canPatrol() {
        return !(this.alerted || super.isHit() || this.attacking);
    }

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

    moveLeft() {
        this.otherDirection = false;
        this.movingRight = false;
        this.movingLeft = true;
        super.moveLeft();
    }

    moveRight() {
        this.otherDirection = true;
        this.movingRight = true;
        this.movingLeft = false;
        super.moveRight();
    }

    changeDirection() {
        if (!super.isKilled()) {
            super.changeDirection();
        }
    }

    canMove() {
        return !(this.alerted || super.isHit() || this.attacking);
    }

    canAttack() {
        return !(this.alerted || super.isHit() || this.attacking);
    }

    attack(timeStamp) {
        this.attacking = true;
        setTimeout(() => { this.attacking = false }, (8 * 300)); //attack images length times animationElapse pro attack image
    }

    canAlert() {
        return !(super.isKilled() || this.alerted || this.attacking || super.isHit());
    }

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
    /**
     * @override @function kill 
     * @param {string} method - how was it killed? STAMP (Character Stamped onver head) | KILL (energy = 0)
     */
    kill(method) {
        if (method && method == 'STAMP' || method == 'KILL') {
            this.AUDIOS[method].play();
        }
        super.kill();
    }
}