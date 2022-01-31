class Chicken extends Enemy {
    height = 55;
    width = 70;
    energy = 5;
    y = 0;
    x = 0;
    speedX = 0.15 + Math.random() * 0.5;

    groundPos = 360;

    AUDIOS = CHICKEN_ASSETS['AUDIOS'];
    IMAGES = CHICKEN_ASSETS['IMAGES'];

    constructor(x, y = 0) {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        super.loadAllImages(this.IMAGES);
        this.x = x ? x : 1000 + Math.random() * 500;
        this.y = this.groundPos;
    }

    animate() {
        //super.startDirectionChange();
        super.animate();
    }

    stopAnimate() {
        //super.stopDirectionChange();
        super.stopAnimate();
    }

    play(timeStamp) {
        if(this.playChickenTime === undefined){
            this.playChickenTime = timeStamp;
        }
        const elapse = timeStamp - this.playChickenTime;
        if (elapse > FRAMES_TIME) {
            this.playChickenTime = timeStamp;
            this.playChicken(timeStamp);
        }
        super.play(timeStamp);
    }

    playChicken(timeStamp){
        if (super.isKilled()) {
            super.playAnimation(timeStamp, this.IMAGES['DEAD']);
        } else {
            super.playAnimation(timeStamp, this.IMAGES['WALKING']);
        }
    }

    move(timeStamp) {
        if(this.moveChickenTime === undefined){
            this.moveChickenTime = timeStamp;
        }
        const elapse = timeStamp - this.moveChickenTime;
        if (elapse > FRAMES_TIME) {
            this.moveChickenTime = timeStamp;
            this.moveChicken(timeStamp);
        }
        super.move(timeStamp);
    }

    moveChicken(timeStamp){
        if (!super.isKilled()) {
            if (this.otherDirection) {
                super.moveRight();
            }
            else {
                super.moveLeft();
            }
        }else{
            setTimeout(super.stopMove.bind(this));
        }
    }
}