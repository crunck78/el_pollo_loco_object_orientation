class Enemy extends NPC {

    alertDistance = 200;
    alerted = false;
    attacking = false;
    lastAlertPosition = undefined;
    lastPosX = undefined;
    patrolDistance = 500;

    animate() {
        super.startGravity();
        super.animate();
    }

    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    move(timeStamp) {
        if (this.moveEnemyTime === undefined) {
            this.moveEnemyTime = timeStamp;
        }
        const elapse = timeStamp - this.moveEnemyTime;
        if (elapse > FRAMES_TIME) {
            this.moveEnemyTime = timeStamp;
            if (!super.isKilled()) {
                if (this.canPatrol()) { this.patrol() }
            }
        }
        super.move(timeStamp);
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
        if (this.lastAlertPosition) {
            if (this.changeDirectionInterval) { this.stopDirectionChange(); }
            this.movingRight = false;
            this.movingLeft = false;
            if (this.x < this.lastAlertPosition) { this.moveRight(); }
            if (this.x > this.lastAlertPosition) { this.moveLeft(); }
        } else {
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
        // this.lastAttack = new Date().getTime();
        // if(!super.isAboveGround()){
        //     super.jump();
        // }

        //console.log("ATTACK");
        setTimeout(() => { this.attacking = false }, (8 * 300)); //attack images length times animationElapse pro attack image
    }

    canAlert() {
        return !(this.isKilled() || this.alerted || this.attacking || super.isHit());
    }

    alert(timeStamp) {
        this.alerted = true;
        // this.lastAlert = new Date().getTime();
        //console.log("ALERT");
        setTimeout(() => { this.alerted = false; if (this.canAttack()) { this.attack(); } }, (8 * 300)); //alert images length times animationElapse pro alert image
    }
}