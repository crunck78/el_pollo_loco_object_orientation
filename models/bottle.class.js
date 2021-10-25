class Bottle extends MovableObject {
    width = 100;
    height = 100;

    groundPos = 340;

    offsetTop = 10;
    offsetLeft = 10;
    offsetRight = 10;
    offsetBottom = 10;

    playAnimationElapse = 300;

    IMAGES = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];
    constructor(x, y) {
        super().loadImage('img/6.botella/2.Botella_enterrada1.png');
        super.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
    }

    animate() {
        super.startGravity();
        super.animate();
    }

    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    play(timeStamp) {
        const elapse = timeStamp - this.playTime;
        if (elapse > FRAMES_TIME) {
            this.playTime = timeStamp;
            this.playAnimation(timeStamp, this.IMAGES);
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