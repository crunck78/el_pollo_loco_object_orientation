/**
 * An extension of MovableObject that can collide with other CollidableObjects.
 */
class CollidableObject extends MovableObject {

    /**
     * @type {boolean} - a flag to mark this instance as collidable
     */
    collidable = true;

    /**
     * @type {number} - how much damage can this instance cause to other DestroyableObjects 
     */
    damage = 0;

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
     * @function canCollide , to validate collision check
     * @returns {boolean}
     */
    canCollide() {
        return this.collidable;
    }

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
        return !(this.getHitBoxRightPos() > mo.getHitBoxLeftPos());
    }

    /**
     * If this instance is on the right side of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isRightSide(mo) {
        return !(this.getHitBoxLeftPos() < mo.getHitBoxRightPos());
    }

    /**
     * If this instance is above of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isAbove(mo) {
        return !(this.getHitBoxBottomPos() > mo.getHitBoxTopPos());
    }

    /**
     * If this instance is below of @param mo relative to viewer
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isBelow(mo) {
        return !(this.getHitBoxTopPos() < mo.getHitBoxBottomPos());
    }

    /**
     * Get this instance @member x plus this instance @member object.left value
     * @returns {number}
     */
    getHitBoxLeftPos() {
        return this.x + this.offset.left;
    }

    /**
    * Get this instance @member x plus this instance @member width minus this instance @member object.left value
    * @returns {number}
    */
    getHitBoxRightPos() {
        return this.x + this.width - this.offset.right;
    }

    /**
    * Get this instance @member y plus this instance @member object.top value
    * @returns {number}
    */
    getHitBoxTopPos() {
        return this.y + this.offset.top;
    }

    /**
    * Get this instance @member y plus this instance @member height minus this instance @member object.bottom value
    * @returns {number}
    */
    getHitBoxBottomPos() {
        return this.y + this.height - this.offset.bottom;
    }

    /**
     * Get the distance of this instance to the @param mo over the Vertical Axy
     * @param {CollidableObject} mo 
     * @returns {number}
     */
    distanceFromOffsetY(mo) {
        if (this.isAbove(mo)) {
            return mo.getHitBoxTopPos() - this.getHitBoxBottomPos();
        }

        if (this.isBelow(mo)) {
            return this.getHitBoxTopPos() - mo.getHitBoxBottomPos();
        }

        return 0; // means they are intersectingY
    }

    /**
     * Get the distance of this instance to the @param mo over the Horizontal Axy
     * @param {CollidableObject} mo 
     * @returns {number}
     */
    distanceFromOffsetX(mo) {
        if (this.isLeftSide(mo)) {
            return mo.getHitBoxLeftPos() - this.getHitBoxRightPos();
        }

        if (this.isRightSide(mo)) {
            return this.getHitBoxLeftPos() - mo.getHitBoxRightPos();
        }

        return 0; // means they are intersectingX
    }

    /**
     * Help @function drawHitBoxFrame, to visualize the objects hit box
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
    drawHitBoxFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.getHitBoxLeftPos(),
            this.getHitBoxTopPos(),
            this.getHitBoxWidth(),
            this.getHitBoxHeight()
        );
        ctx.stroke();
    }

    getHitBoxWidth(){
        return  this.getHitBoxRightPos() - this.getHitBoxLeftPos();
    }

    getHitBoxHeight(){
        return this.getHitBoxBottomPos() - this.getHitBoxTopPos();
    }
}