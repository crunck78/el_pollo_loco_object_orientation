class Enemy extends DestroyableObject {

    alertDistance = 200;

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

    canAttack(){
        return false;
        return !(this.isAttacking() || super.isLaunching()) && this.isAlert();
    }

    isAttacking(){
        let timePassed = new Date().getTime() - this.lastAttack;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
    
    attack(){
        // if(!(super.isLaunching() ) && this.isAlert()){
        //     super.launch();
        //     //this.lastAttack = new Date().getTime();
        // }
    }

    isAlert() {
        let timePassed = new Date().getTime() - this.lastAlert;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    alert(char) {
        // if(char instanceof Character){
        //     if(!(super.isKilled() || this.isAlert() || this.isAttacking()) && super.distanceFromX(char) < this.alertDistance){
        //         this.lastAlert = new Date().getTime();
        //         setTimeout(()=>{this.attack()}, 1000);
        //     }
        // }
    }
}