class Coin extends MovableObject {
    width = 100;
    height = 100;

    offsetTop = 20;
    offsetLeft = 20;
    offsetRight = 20;
    offsetBottom = 20;

    IMAGES = [
        'img/8.Coin/Moneda1.png',
        'img/8.Coin/Moneda2.png'
    ];
    constructor(x, y) {
        super().loadImage('img/8.Coin/Moneda1.png');
        super.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}