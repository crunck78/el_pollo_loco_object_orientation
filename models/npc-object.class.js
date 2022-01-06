class NPC extends DestroyableObject{
    changeDirectionTime = 5000;

     startDirectionChange() {
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), this.changeDirectionTime);
    }

    stopDirectionChange() {
        clearInterval(this.changeDirectionInterval);
    }

    changeDirection() {
        this.otherDirection = !this.otherDirection;
    }
}