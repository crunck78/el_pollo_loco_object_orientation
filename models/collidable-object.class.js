/**
 * An extension of MovableObject that can collide with other CollidableObjects.
 */
class CollidableObject extends MovableObject {
    /**
     * @type {object} - Numerical offsets for this instance's coordinates and dimensions,
     * used for collision check.
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * If this instance is colliding with @param mo
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.isIntersectingX(mo) && this.isIntersectingY(mo);
    }

    /**
     * If this instance is intersecting @param mo on the horizontal axis. 
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isIntersectingX(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    /**
     * If this instance is intersecting @param mo on the vertical axis. 
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isIntersectingY(mo) {
        return !(this.isAbove(mo) || this.isBelow(mo));
    }

    /**
     * If this instance is on the left side of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isLeftSide(mo) {
        return !(this.getRightPos() > mo.getLeftPos());
    }

    /**
     * If this instance is on the right side of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isRightSide(mo) {
        return !(this.getLeftPos() < mo.getRightPos());
    }

    /**
     * If this instance is above of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isAbove(mo) {
        return !(this.getBottomPos() > mo.getTopPos());
    }

    /**
     * If this instance is below of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isBelow(mo) {
        return !(this.getTopPos() < mo.getBottomPos());
    }

    /**
     * Get this instance @member x plus this instance @member object.left value
     * @returns {number}
     */
    getLeftPos() {
        return this.x + this.offset.left;
    }

    /**
    * Get this instance @member x plus this instance @member width minus this instance @member object.left value
    * @returns {number}
    */
    getRightPos() {
        return this.x + this.width - this.offset.right;
    }

    /**
    * Get this instance @member y plus this instance @member object.top value
    * @returns {number}
    */
    getTopPos() {
        return this.y + this.offset.top;
    }

    /**
    * Get this instance @member y plus this instance @member height minus this instance @member object.bottom value
    * @returns {number}
    */
    getBottomPos() {
        return this.y + this.height - this.offset.bottom;
    }

    /**
     * Get the distance of this instance to the @param mo over the Vertical Axy
     * @param {CollidableObject} mo 
     * @returns {number}
     */
    distanceFromY(mo) {
        if (this.isAbove(mo)) {
            return mo.getTopPos() - this.getBottomPos();
        }

        if (this.isBelow(mo)) {
            return this.getTopPos() - mo.getBottomPos();
        }

        return 0; // means they are intersectingY
    }

    /**
     * Get the distance of this instance to the @param mo over the Horizontal Axy
     * @param {CollidableObject} mo 
     * @returns {number}
     */
    distanceFromX(mo) {
        if (this.isLeftSide(mo)) {
            return mo.getLeftPos() - this.getRightPos();
        }

        if (this.isRightSide(mo)) {
            return this.getLeftPos() - mo.getRightPos();
        }

        return 0; // means they are intersectingX
    }
}