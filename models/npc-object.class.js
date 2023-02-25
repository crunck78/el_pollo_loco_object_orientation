/**
 * An extension of Creature, defines some self behavior for non-playable-characters.
 */
class NPC extends Creature{

    /**
     * Used to count after how much time should @member otherDirection change value;
     * Toggles the value of @member otherDirection after given milliseconds value.
     * @type {number}
     */
    changeDirectionTime = 5000;

    /**
     * Control flag, to determine if this instance is moving left side.
     * @type {boolean}
     */
    movingLeft = false;

    /**
     * Control flag, to determine if this instance is moving right side.
     * @type {boolean}
     */
    movingRight = false;

    /**
     * Starts the change Direction Interval @function changeDirection every @member changeDirectionTime ms.
     */
     startDirectionChange() {
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), this.changeDirectionTime);
    }

    /**
     * Stops the change Direction Interval
     */
    stopDirectionChange() {
        clearInterval(this.changeDirectionInterval);
        this.changeDirectionInterval = undefined;
    }

    /**
     * Toggles the value of @member otherDirection
     */
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