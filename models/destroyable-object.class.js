/**
 * An extension of Class CollidableObject, used to damage this instance and measure if is hurt or killed.
 */
class DestroyableObject extends CollidableObject{

    /**
     * 
     */
    destroyable = true;

    /**
     * @type {number} - 0 or less = dead 
     */
    energy = 100;

    /**
     * @type {number} - time in milliseconds on last @member energy damage
     */
    lastHit = 0;

    canHit() {
        //Logic and Time Controlled?
    }

    /**
     * @override @function canCollide 
     */
    canCollide(){
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
     * this instance takes a given damage on @member energy
     * if energy is below 0, it is kept at 0
     * else get current time for @member lastHit
     * @param {number} damage - how much damage should this instance take
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
     * If this instance @member energy is 0
     * @returns {boolean}
     */
    isKilled() {
        return this.energy == 0;
    }

    /**
     * Sets this instance @member energy to 0
     * and @member currentImage to 0,
     * This action requires that animation starts with first image.
     */
    kill() {
        this.energy = 0;
        this.currentImage = 0;
    }
}