/**
 * An extension of Class CollidableObject, used to damage this instance and measure if is hurt or killed.
 */
class DestroyableObject extends CollidableObject {

    destroyable = true;
    energy = 100;
    lastHit = 0;

    canHit() {
        //Logic and Time Controlled?
    }

    /**
     * @override
     */
    canCollide() {
        return !(this.isKilled() || this.isHit()) && super.canCollide();
    }

    /**
     * If one seconde passed after last hit.
     * @returns {boolean}
     */
    isHit() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * @param {number} damage how much damage should this instance take
     * If no damage is given it will take a minimum 5 damage
     */
    hit(damage) {
        this.currentImage = 0;
        this.energy -= damage ? damage : 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * @returns {boolean} If energy equals zero
     */
    isKilled() {
        return this.energy == 0;
    }

    /**
     * Sets energy to 0 and currentImage to 0,
     * This action requires that animation starts with first image.
     */
    kill() {
        this.energy = 0;
        this.currentImage = 0;
    }
}