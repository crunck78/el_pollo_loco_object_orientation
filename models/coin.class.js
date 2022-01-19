class Coin extends CollidableObject {
    width = 100;
    height = 100;

    groundPos = 200;
    speedX = 10;

    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

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
        if (this.playCoinTime === undefined) {
            this.playCoinTime = timeStamp;
        }
        const elapse = timeStamp - this.playCoinTime;
        if (elapse > FRAMES_TIME) {
            this.playCoinTime = timeStamp;
            super.playAnimation(timeStamp, this.IMAGES);
        }
        super.play(timeStamp);
    }

    move(timeStamp) {
        if (this.moveCoinTime === undefined) {
            this.moveCoinTime = timeStamp;
        }
        const elapse = timeStamp - this.moveCoinTime;
        if (elapse > FRAMES_TIME) {
            this.moveCoinTime = timeStamp;
            //HERE MOVE LOGIC
        }
        super.move(timeStamp);
    }
}