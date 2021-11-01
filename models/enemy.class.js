class Enemy extends MovableObject {

    animate() {
        super.startGravity();
        super.animate();
    }

    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    move(timeStamp) {
        if(this.moveEnemyTime === undefined){
            this.moveEnemyTime = timeStamp;
        }
        const elapse = timeStamp - this.moveEnemyTime;
        if (elapse > FRAMES_TIME) {
            this.moveEnemyTime = timeStamp;
            if (!super.isKilled()) {
                // if (this.otherDirection) { //interesting ... super methods call behave as i expacted ...  but super fileds call does not work
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

    isAlert(){
        //TODO
        return false;
    }
}