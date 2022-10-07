class Platform extends CollidableObject{

    width = 200;
    height = 50;
    y = 300;

    IMAGES = [
        'img/10.Platform/platform.png'
    ];

    constructor(x){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
    }

    isUnder(mo){
        return this.isHorizontalIntersecting(mo) &&
        mo.isAbove(this);
    }
}