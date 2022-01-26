/**
 * An extension of MovableObject that can collide with other CollidablesObjects.
 */
class CollidableObject extends MovableObject {
    /**
    * @type {object} - Offsets for Collision Check
    */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * IF @this is colliding with @param mo
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.isIntersectingX(mo) && this.isIntersectingY(mo);
    }

    /**
     * If @this is intersecting @param mo on the horizontal axis. 
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isIntersectingX(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    /**
     * If @this is intersecting @param mo on the vertical axis. 
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isIntersectingY(mo) {
        return !(this.isAbove(mo) || this.isBelow(mo));
    }

    /**
     * If @this is on the left side of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isLeftSide(mo) {
        return !(this.getRightPos() > mo.getLeftPos());
    }

    /**
     * If @this is on the right side of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isRightSide(mo) {
        return !(this.getLeftPos() < mo.getRightPos());
    }

    /**
     * If @this is above of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isAbove(mo) {
        return !(this.getBottomPos() > mo.getTopPos());
    }

    /**
     * If @this is below of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isBelow(mo) {
        return !(this.getTopPos() < mo.getBottomPos());
    }

    /**
     * Get @this @member x plus @this @member object.left value
     * @returns {number}
     */
    getLeftPos() {
        return this.x + this.offset.left;
    }

    /**
    * Get @this @member x plus @this @member width minus @this @member object.left value
    * @returns {number}
    */
    getRightPos() {
        return this.x + this.width - this.offset.right;
    }

    getTopPos() {
        return this.y + this.offset.top;
    }

    getBottomPos() {
        return this.y + this.height - this.offset.bottom;
    }

    distanceFromY(mo) {
        if (this.isAbove(mo)) {
            return mo.getTopPos() - this.getBottomPos();
        }

        if (this.isBelow(mo)) {
            return this.getTopPos() - mo.getBottomPos();
        }

        return 0; // means they are intersectingY
    }

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