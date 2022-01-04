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

    isColliding(mo) {
        return this.isIntersectingX(mo) && this.isIntersectingY(mo);
    }

    isIntersectingX(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    isIntersectingY(mo) {
        return !(this.isAbove(mo) || this.isBelow(mo));
    }

    isLeftSide(mo) {
        return !(this.getRightPos() > mo.getLeftPos());
    }

    isRightSide(mo) {
        return !(this.getLeftPos() < mo.getRightPos());
    }

    isAbove(mo) {
        return !(this.getBottomPos() > mo.getTopPos());
    }

    isBelow(mo) {
        return !(this.getTopPos() < mo.getBottomPos());
    }

    getLeftPos() {
        return this.x + this.offset.left;
    }

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