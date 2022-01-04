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

    isHit() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    hit() {
        this.currentImage = 0;
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isKilled() {
        return this.energy == 0;
    }

    kill() {
        this.currentImage = 0;
        this.energy = 0;
    }
}