class Enemy extends MovableObject{

    move() {
        if (!super.isDead()) {
            if (this.otherDirection) { //interesting ... super methods call behave as i expacted ...  but super fileds call does not work
                super.moveRight();
            }
            else {
                super.moveLeft();
            }
        }
    }

    changeDirection(){
        if(!super.isDead()){
            super.changeDirection();
        }
    }
}