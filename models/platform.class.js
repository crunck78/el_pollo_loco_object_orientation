class Platform extends CollidableObject{

    width = 300;
    height = 50;
    y = 300;

    IMAGES = [
        'img/10.Platform/platform.png'
    ];

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y = 300){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
    }

    /**
     * Check if this is below provide MovableObject
     * @param {MovableObject} mo
     * @returns {boolean}
     */
    isUnder(mo){
        return this.isHorizontalIntersecting(mo) &&
        mo.isAbove(this);
    }
}