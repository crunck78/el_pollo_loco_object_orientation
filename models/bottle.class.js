class Bottle extends MovableObject {
    width = 100;
    height = 100;

    groundPos = 340;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

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
        if(this.playBottleTime === undefined){
            this.playBottleTime = timeStamp;
        }
        const elapse = timeStamp - this.playBottleTime;
        if (elapse > FRAMES_TIME) {
            this.playBottleTime = timeStamp;
            this.playAnimation(timeStamp, this.IMAGES);
        }
        super.play(timeStamp);
    }

    move(timeStamp) {
        if(this.moveBottleTime === undefined){
            this.moveBottleTime = timeStamp;
        }
        const elapse = timeStamp - this.moveBottleTime;
        if (elapse > FRAMES_TIME) {
            this.moveBottleTime = timeStamp;
            //HERE MOVE LOGIC
        }
        super.move(timeStamp);
    }
}