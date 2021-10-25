class Coin extends MovableObject {
    width = 100;
    height = 100;

    groundPos = 200;
    speed = 10;

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
    }

    play(timeStamp) {
        const elapse = timeStamp - this.playTime;
        if (elapse > FRAMES_TIME) {
            this.playTime = timeStamp;
            super.playAnimation(timeStamp, this.IMAGES);
        }
        super.play(timeStamp);
    }

    move(timeStamp) {
        const elapse = timeStamp - this.moveTime;
        if (elapse > FRAMES_TIME) {
            this.moveTime = timeStamp;
        }
        super.move(timeStamp);
    }
}