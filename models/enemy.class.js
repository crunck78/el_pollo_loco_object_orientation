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
               if(this.canPatrol()) {this.patrol()}
            }
        }
        super.move(timeStamp);
    }

    canSearch(){
        return !(this.isAlert() || super.isHit() || this.isAttacking());
    }

    search(){
        if(this.lastAlertPosition ){

        }else{
            this.patrol();
        }
    }

    canPatrol(){
        return !(this.isAlert() || super.isHit() || this.isAttacking());
    }

    patrol(){
        if(this.lastAlertPosition){
            if(this.x < this.lastAlertPosition){ this.moveRight(); }
            if(this.x > this.lastAlertPosition){ this.moveLeft(); }
        }
    }

    moveLeft(){
        this.otherDirection = false;
        this.movingRight = false;
        this.movingLeft = true;
        super.moveLeft();
    }

    moveRight(){
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
        return !(this.isAlert() || super.isHit() || this.isAttacking());
    }

    canAttack() {
        return !(this.isAlert() || super.isHit() || this.isAttacking());
    }

    isAttacking() {
        // let timePassed = new Date().getTime() - this.lastAttack;
        // timePassed = timePassed / 1000;
        // return timePassed < (8 * 300) / 1000;
        return this.attacking;
    }

    attack(timeStamp) {
        this.attacking = true;
        // this.lastAttack = new Date().getTime();
        // if(!super.isAboveGround()){
        //     super.jump();
        // }
        
        console.log("ATTACK");
        setTimeout(() => { this.attacking = false }, (8 * 300)); //attack images length times animationElapse pro attack image
    }

    canAlert(){
        return !(this.isAlert() || this.isAttacking()) || super.isHit();
    }

    isAlert() {
        // let timePassed = new Date().getTime() - this.lastAlert;
        // timePassed = timePassed / 1000;
        // return timePassed < (8 * 300) / 1000;
        return this.alerted;
    }

    alert(timeStamp) {
        this.alerted = true;
        // this.lastAlert = new Date().getTime();
        console.log("ALERT");
        setTimeout(() => { this.alerted = false; this.attack(); }, (8 * 300)); //alert images length times animationElapse pro alert image
    }
}