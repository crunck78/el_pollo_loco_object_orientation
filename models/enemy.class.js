class Enemy extends MovableObject{

    move() {
        if (!this.isDead()) {
            if (this.otherDirection) {
                super.moveRight();
            }
            else {
                super.moveLeft();
            }
        }
    }

    changeDirection() {
        this.otherDirection = !this.otherDirection;
    }
}