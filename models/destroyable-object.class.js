class DestroyableObject extends CollidableObject{
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
     * If one seconde passed after last hit.
     * @returns {boolean}
     */
    isHit() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * @this takes 20 damage on @this @member energy
     */
    hit() {
        this.currentImage = 0;
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * If @this @member energy is 0
     * @returns {boolean}
     */
    isKilled() {
        return this.energy == 0;
    }

    /**
     * Sets @this @member energy to 0
     */
    kill() {
        this.currentImage = 0;
        this.energy = 0;
    }
}