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
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.isHorizontalIntersecting(mo) && this.isVerticalIntersecting(mo);
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isHorizontalIntersecting(mo) {
        return !(this.isLeftSide(mo) || this.isRightSide(mo));
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isVerticalIntersecting(mo) {
        return !(this.isAbove(mo) || this.isBelow(mo));
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isLeftSide(mo) {
        return !(this.getHitBoxRightPos() > mo.getHitBoxLeftPos());
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isRightSide(mo) {
        return !(this.getHitBoxLeftPos() < mo.getHitBoxRightPos());
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isAbove(mo) {
        return !(this.getHitBoxBottomPos() > mo.getHitBoxTopPos());
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {boolean}
     */
    isBelow(mo) {
        return !(this.getHitBoxTopPos() < mo.getHitBoxBottomPos());
    }

    /**
    * @returns {number}
    */
     getHitBoxRightPos() {
        return this.x + this.width - this.offset.right;
    }

    /**
     * @returns {number}
     */
    getHitBoxLeftPos() {
        return this.x + this.offset.left;
    }

    /**
    * @returns {number}
    */
    getHitBoxTopPos() {
        return this.y + this.offset.top;
    }

    /**
    * @returns {number}
    */
    getHitBoxBottomPos() {
        return this.y + this.height - this.offset.bottom;
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {number}
     */
    verticalDistanceFrom(mo) {
        if (this.isAbove(mo)) {
            return mo.getHitBoxTopPos() - this.getHitBoxBottomPos();
        }

        if (this.isBelow(mo)) {
            return this.getHitBoxTopPos() - mo.getHitBoxBottomPos();
        }

        return 0; // means they are intersectingY
    }

    /**
     * @param {CollidableObject} mo 
     * @returns {number}
     */
    horizontalDistanceFrom(mo) {

        if (this.isLeftSide(mo)) {
            return mo.getHitBoxLeftPos() - this.getHitBoxRightPos();
        }

        if (this.isRightSide(mo)) {
            return this.getHitBoxLeftPos() - mo.getHitBoxRightPos();
        }

        return 0; // means they are intersectingX
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
    drawHitBox(ctx){
        this.drawHitBoxFrame(ctx);
        this.drawHitBoxCoordinates(ctx);
    }

    /**
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

    /**
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
    drawHitBoxCoordinates(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'black';
        ctx.font = 'normal small-caps 100 20px serif';
        ctx.strokeText(
            'x: ' + this.getHitBoxLeftPos() + ' y: ' + this.getHitBoxTopPos(),
            this.getHitBoxLeftPos(),
            this.getHitBoxTopPos() - 16
        );
    }

    getHitBoxWidth() {
        return this.getHitBoxRightPos() - this.getHitBoxLeftPos();
    }

    getHitBoxHeight() {
        return this.getHitBoxBottomPos() - this.getHitBoxTopPos();
    }
}