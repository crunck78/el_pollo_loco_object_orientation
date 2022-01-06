class Enemy extends NPC {

    alertDistance = 200;
    alerted = false;
    attacking = false;

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
                // if (this.otherDirection) { //interesting ... super methods call behave as i expected ...  but super fields call does not work
                //     super.moveRight();
                // }
                // else {
                //     super.moveLeft();
                // }
            }
        }
        super.move(timeStamp);
    }

    changeDirection() {
        if (!super.isKilled()) {
            super.changeDirection();
        }
    }

    canAttack() {
        return false;
        return !(this.isAttacking() || super.isLaunching()) && this.isAlert();
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
        setTimeout(() => { this.attacking = false }, (8 * 300));
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
        setTimeout(() => { this.attack(); this.alerted = false; }, (8 * 300));
    }
}