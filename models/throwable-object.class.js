class ThrowableObject extends MovableObject {
    height = 100;
    width = 60;
    speedY = 30;
    speed = 10;
    groundPos = 380;
    targetHit = false;
    IMAGE_ROTATION_BOTTLE = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];

    IMAGE_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
    ];

    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        super.loadImages(this.IMAGE_ROTATION_BOTTLE);
        super.loadImages(this.IMAGE_SPLASH);
        super.x = x;
        super.y = y;
        super.applyGravity();
        this.throw();
    }

    break(){
        //first resolve ... but it can be better
        this.groundPos = this.y;
    }

    throw() {
        this.moveInterval = setInterval(this.move.bind(this), 25);
        this.playInterval = setInterval(this.play.bind(this), 100);
    }

    move() {
        if (super.isAboveGround()) {
            super.moveRight();
        }else{
            setTimeout(this.clearThrow.bind(this), 600);
        }
    }

    clearThrow(){
        clearInterval(this.moveInterval);
        clearInterval(this.playInterval);
    }

    play() {
        if (super.isAboveGround()) {
            super.playAnimation(this.IMAGE_ROTATION_BOTTLE);
        }
        else {
            super.playAnimation(this.IMAGE_SPLASH);
        }
    }
}