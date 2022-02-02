/**
 * An extension of MovableObject. Represents some Clouds in the sky that move alone in a given direction
 */
class Cloud extends MovableObject {
    y = 50;
    x = Math.random() * 500; //Zahl zwieschen 0 und 500
    width = 500;
    height = 250;
    constructor(width, height, distance = 1) {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.width = width;
        this.height = height;
        this.distance = distance;
    }

    move(timeStamp) {
        if(this.moveCloudTime === undefined){
            this.moveCloudTime = timeStamp;
        }
        const elapse = timeStamp - this.moveCloudTime;
        if (elapse > FRAMES_TIME) {
            this.moveCloudTime = timeStamp;
            super.moveLeft();
        }
        super.move(timeStamp);
    }

    play(timeStamp) {
        if(this.playCloudTime === undefined){
            this.playCloudTime = timeStamp;
        }
        const elapse = timeStamp - this.playCloudTime;
        if (elapse > FRAMES_TIME) {
            this.playCloudTime = timeStamp;
            //HERE PLAY ANIMATIONS LOGIC
        }
        super.play(timeStamp);
    }
}