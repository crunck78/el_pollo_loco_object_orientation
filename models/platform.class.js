class Platform extends CollidableObject{

    width = 200;
    height = 50;
    y = 300;

    IMAGES = [
        'img/10.Platform/platform.png'
    ];

    /**
     *
     * @param {number} x
     */
    constructor(x){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
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