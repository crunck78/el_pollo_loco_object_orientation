class ThrowableObject extends MovableObject {
    height = 100;
    width = 60;
    speedY = 30;
    speed = 15;
    groundPos = 380;
    acceleration = 2.5;
    playTime = 200;
    energy = 5;

    offsetTop = 10;
    offsetLeft = 10;
    offsetRight = 10;
    offsetBottom = 10;

    playAnimationElapse = 60;

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

    AUDIOS = {
        break : new Audio('audio/glassBreak.mp3')
    }

    // Created as a Bottle is been throw
    constructor(x, y, otherDirection) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        super.loadImages(this.IMAGE_ROTATION_BOTTLE);
        super.loadImages(this.IMAGE_SPLASH);
        super.x = x;
        super.y = y;
        super.otherDirection = otherDirection;
        this.animate();
    }

    break() {
        //first resolve ... but it can be better
        //setting groundPos to y the throwable object lands on the ground 
        //or isAboveGround() is false
        this.groundPos = this.y + 40; //to look like it breaks on the object ist collide with
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
        if(this.playThrowObjecTime === undefined){
            this.playThrowObjecTime = timeStamp;
        }
        const elapse = timeStamp - this.playThrowObjecTime;
        if (elapse > FRAMES_TIME) {
            this.playThrowObjecTime = timeStamp;
            if (super.isAboveGround()) {
                super.playAnimation(timeStamp, this.IMAGE_ROTATION_BOTTLE);
            }
            else {
                this.AUDIOS['break'].play();
                super.playAnimation(timeStamp, this.IMAGE_SPLASH);
            }
        }
        super.play(timeStamp);
    }

    move(timeStamp) {
        if(this.moveThrowObjectTime === undefined){
            this.moveThrowObjectTime = timeStamp;
        }
        const elapse = timeStamp - this.moveThrowObjectTime;
        if (elapse > FRAMES_TIME) {
            this.moveThrowObjectTime = timeStamp;
            if (super.isAboveGround()) {
                if(this.otherDirection){
                    super.moveLeft();
                }else{
                    super.moveRight();
                }
            } else {
                super.stopMove();
                this.playAnimationElapse = 100;
                setTimeout(this.stopAnimate.bind(this), this.playAnimationElapse * this.IMAGE_SPLASH.length);
            }
        }
        super.move(timeStamp);
    }

    // animate(){
    //     setInterval(()=>{
    //         this.playAnimation();
    //     }, 100);

    //     this.startMove();
    // }

    // startMove(){
    //     this.moveInterval = setInterval(()=>{
    //         if(this.isAboveGround()){
    //             this.moveLeft();
    //         }else{
    //             this.stopMove();
    //         }
    //     }, 100);
    // }

    // stopMove(){
    //     clearInterval(this.moveInterval);
    // }

    hit(){
        super.hit();
        this.break();
    }
}