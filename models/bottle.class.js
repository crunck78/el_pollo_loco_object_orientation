class Bottle extends MovableObject{
    width = 100;
    height = 100;

    groundPos = 340;

    offsetTop = 10;
    offsetLeft = 10;
    offsetRight = 10;
    offsetBottom = 10;

    IMAGES = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];
    constructor(x, y) {
        super().loadImage('img/6.botella/2.Botella_enterrada1.png');
        super.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        super.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}