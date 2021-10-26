class Character extends MovableObject {
    world;
    walking_sound = new Audio('audio/running.mp3');
    height = 250;
    y = 80;
    speed = 5;
    groundPos = 160;

    offsetTop = 120;
    offsetBottom = 0;
    offsetLeft = 40;
    offsetRight = 30;

    idleTime = 5001; // ms
    lastIdle = new Date().getTime();

    bottles = 0;
    coins = 0;

    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
    ];

    IMAGES_HIT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
    ];

    IMAGES_ATTACK = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png'
    ];


    IMAGES_LAUNCH = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png'
    ];

    IMAGES_JUMP = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        // 'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
    ];

    IMAGES_MID_AIR = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png'
    ];

    IMAGES_LANDING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png'
    ];

    IMAGES_LANDED = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
    ];

    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];

    IMAGES_IDLE = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png',
    ];

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');

        super.loadImages(this.IMAGES_DEAD);
        super.loadImages(this.IMAGES_HIT);
        super.loadImages(this.IMAGES_ATTACK);
        super.loadImages(this.IMAGES_LAUNCH);
        super.loadImages(this.IMAGES_JUMP);
        super.loadImages(this.IMAGES_MID_AIR);
        super.loadImages(this.IMAGES_LANDING);
        super.loadImages(this.IMAGES_LANDED);
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_IDLE);
        super.loadImages(this.IMAGES_LONG_IDLE);
    }

    animate() {
        super.startGravity();
        super.animate();
    }

    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    move(timeStamp) {
        const elapse = timeStamp - this.moveTime;
        if (elapse > FRAMES_TIME) {
            this.moveTime = timeStamp;
            this.walking_sound.pause();
            if (!super.isKilled()) {
                if (this.canMoveRight()) {
                    this.moveRight();
                }
                if (this.canMoveLeft()) {
                    this.moveLeft();
                }
                if (this.canLaunch()) {
                    this.launch();
                }
                if (this.canAttack()) {
                    this.attack();
                }
                this.world.camera_x = -this.x + 120;
            }
        }
        super.move(timeStamp);
    }

    isMoving() {
        return this.isMovingRight() || this.isMovingLeft();
    }

    canMoveRight() {
        return this.isMovingRight() && this.x < this.world.level.level_end_x;
    }

    isMovingRight() {
        return this.world.keyboard.RIGHT; // Poor Control should be fixed
    }

    moveRight() {
        this.lastIdle = 0;
        super.moveRight();
        super.otherDirection = false;
        this.walking_sound.play();
    }

    canMoveLeft() {
        return this.isMovingLeft() && this.x > 120; // initial start x position
    }

    isMovingLeft() {
        return this.world.keyboard.LEFT; // Poor Control should be fixed
    }

    moveLeft() {
        this.lastIdle = 0;
        super.moveLeft();
        super.otherDirection = true;
        this.walking_sound.play();
    }

    canLaunch() {
        return (this.world.keyboard.SPACE && !(this.isAboveGround() || this.launching));
    }

    launch() {
        this.lastIdle = 0;
        this.launching = true;
        super.launch();
    }

    canAttack() {
        return this.world.keyboard.D &&
            this.world.keyboard.THROW_REQUEST_START > this.world.keyboard.THROW_REQUEST_STOP &&
            this.bottles > 20;
    }

    isAttacking() {
        return this.attacking;
    }

    attack() {
        this.lastIdle = 0;
        this.attacking = true;
        this.world.keyboard.THROW_REQUEST_STOP = new Date().getTime();
        let bottle = new ThrowableObject(this.x, this.y + 100);
        this.world.throwableObjects.push(bottle);
        this.bottles -= 20;
        this.world.bottlesBar.setPercentage(this.bottles);
    }

    play(timeStamp) {
        const elapse = timeStamp - this.playTime;
        if (elapse > FRAMES_TIME) {
            this.playTime = timeStamp;
            this.playCharacter(timeStamp);
        }
        super.play(timeStamp);
    }

    playCharacter(timeStamp){
        if (super.isKilled()) {
            this.playDead(timeStamp);
        } else if (super.isHit()) {
            this.playHit(timeStamp);
        } else if (this.isAttacking()) {
            this.playAttack(timeStamp);
        } else if (super.isLaunching()) {
            this.playLuanch(timeStamp);
        } else if (super.isAboveGround() || this.speedY > 0) {
            if (super.isJumping()) {
                this.playJump(timeStamp);
            }
            if (super.isMitAir()) {
                this.playMitAir(timeStamp);
            }
            if (super.isLanding()) {
                this.playLanding(timeStamp);
            }
            if(super.isLanded()){
                this.playLanded(timeStamp);
            }
        } else if (this.isMoving()) {
            this.playMove(timeStamp);
        } else {
            this.playStand(timeStamp);
        }
    }

    playDead(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_DEAD);
    }

    playHit(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_HIT);
    }

    playLuanch(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_LAUNCH);
        setTimeout(() => this.launching = false, 250);
    }

    playJump(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_JUMP);
    }

    playMitAir(timeStamp) {
        // this.landing = false;
        // setTimeout(()=> this.landing = true, 100);
        super.playAnimation(timeStamp, this.IMAGES_MID_AIR);
    }

    playLanding(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_LANDING);
    }

    playLanded(timeStamp){
        this.landed = ture;
        super.playAnimation(timeStamp, this.IMAGES_LANDED);
    }

    playMove(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_WALKING);
    }

    playStand(timeStamp) {
        if (this.lastIdle == 0) {
            this.lastIdle = new Date().getTime();
        }
        this.idleTime = new Date().getTime() - this.lastIdle;
        if (this.idleTime > 5000) {
            super.playAnimation(timeStamp, this.IMAGES_LONG_IDLE);
        } else {
            super.playAnimation(timeStamp, this.IMAGES_IDLE);
        }
    }

    playAttack(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_ATTACK);
        setTimeout(() => this.attacking = false, 250);
    }

    playLuanch(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_LAUNCH);
    }

    handleLanding() {
        console.log(this, "has Landed");
    }

    handleLaunching() {
        console.log(this, "las launch");
    }

    hit() {
        this.lastIdle = 0;
        super.hit();
    }

    kill() {
        this.lastIdle = 0;
        super.kill();
    }
}