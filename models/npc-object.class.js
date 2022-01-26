class NPC extends Creature{
    changeDirectionTime = 5000;
    movingLeft = false;
    movingRight = false;

     startDirectionChange() {
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), this.changeDirectionTime);
    }

    stopDirectionChange() {
        clearInterval(this.changeDirectionInterval);
        this.changeDirectionInterval = undefined;
    }

    changeDirection() {
        this.otherDirection = !this.otherDirection;
    }

    isMovingLeft(){
        return this.movingLeft;
    }

    isMovingRight(){
        return this.movingRight;
    }
}