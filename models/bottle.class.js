/**
 * An extension of CollectibleObject. Representing a Bottle which the character can collect if it collides with one.
 * and the Character Bottles Bar is not full.
 */
class Bottle extends CollectibleObject {
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

    /**
     *
     * @param {number} x vertical position
     * @param {number} y horizontal position
     */
    constructor(x, y) {
        super().loadImage('img/6.botella/2.Botella_enterrada1.png');
        super.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
    }

    /**
     * @override @function animate
     */
    animate() {
        super.startGravity();
        super.animate();
    }

    /**
     * @override @function stopAnimate
     */
    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    /**
     * @override @function play
     * @param {number} timeStamp
     */
    play(timeStamp) {
        if(this.playBottleTime === undefined){
            this.playBottleTime = timeStamp;
        }
        const elapse = timeStamp - this.playBottleTime;
        if (elapse > FRAMES_TIME) {
            this.playBottleTime = timeStamp;
            super.playAnimation(timeStamp, this.IMAGES);
        }
        super.play(timeStamp);
    }

    /**
     * @override @function move
     * @param {number} timeStamp
     */
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