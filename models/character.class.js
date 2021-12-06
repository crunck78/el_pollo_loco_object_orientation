class Character extends MovableObject {
    height = 250;
    y = 80;
    speed = 5;
    groundPos = 160; //GROUND_LEVEL

    lastIdle = new Date().getTime();

    bottles = 100;
    coins = 0;
    throwBottles = [];

    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    }

    AUDIOS = CHARACTER_ASSETS['AUDIOS'];
    IMAGES = CHARACTER_ASSETS['IMAGES'];

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages();
        this.keyboard = new Keyboard();
        this.createStatusBars();
        this.initX = super.x;
    }

    createStatusBars(){
        this.hitPointsBar = new StatusBar(30, 0, CHARACTER_ASSETS['IMAGES_HIT_POINTS_BAR']);
        this.hitPointsBar.setPercentage(this.energy);
        this.coinsBar = new StatusBar(30, 40, CHARACTER_ASSETS['IMAGES_COINS_BAR']);
        this.coinsBar.setPercentage(this.coins);
        this.bottlesBar = new StatusBar(30, 80, CHARACTER_ASSETS['IMAGES_BOTTLES_BAR']);
        this.bottlesBar.setPercentage(this.bottles);
    }

    loadImages() {
        for (const status in this.IMAGES) {
            super.loadImages(this.IMAGES[status]);
        }
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
        if (this.moveCharTime === undefined) {
            this.moveCharTime = timeStamp;
        }
        const elapse = timeStamp - this.moveCharTime;
        if (elapse > FRAMES_TIME) {
            this.moveCharTime = timeStamp;
            this.moveCharacter(timeStamp);
        }
        super.move(timeStamp);
    }

    moveCharacter(timeStamp) {
        if (!super.isKilled()) {
            if (this.canMoveRight()) { this.moveRight(); }
            if (this.canMoveLeft()) { this.moveLeft(); }
            if (this.canLaunch()) { this.launch(); }
            if (this.canAttack()) { this.attack(); }
        }
    }

    canMoveRight() {
        return this.isMovingRight() && this.x < Level.level_end_x;
    }

    moveRight() {
        this.lastIdle = 0;
        super.moveRight();
        super.otherDirection = false;
    }

    isMoving() {
        return this.isMovingRight() || this.isMovingLeft();
    }

    canMoveLeft() {
        return this.isMovingLeft() && this.x > 120; // initial start x position
    }

    isMovingRight() {
        return this.keyboard.RIGHT; // Poor Control should be fixed
    }

    moveLeft() {
        this.lastIdle = 0;
        super.moveLeft();
        super.otherDirection = true;
    }

    isMovingLeft() {
        return this.keyboard.LEFT; // Poor Control should be fixed
    }

    canLaunch() {
        return (this.keyboard.SPACE && !(this.isAboveGround() || this.launching));
    }

    launch() {
        this.lastIdle = 0; 
        this.launching = true;
        super.launch();
    }

    canAttack() {
        return this.keyboard.D &&
            this.keyboard.THROW_REQUEST_START > this.keyboard.THROW_REQUEST_STOP &&
            this.bottles > 0;
    }

    attack() {
        this.AUDIOS['throw'].play();
        this.lastIdle = 0;
        this.attacking = true;
        this.keyboard.THROW_REQUEST_STOP = new Date().getTime();
        let bottle = new ThrowableObject(this.x, this.y + 100, this.otherDirection);
        this.throwBottles.push(bottle);
        this.bottles -= 5;
        this.bottlesBar.setPercentage(this.bottles);
    }

    isAttacking() {
        return this.attacking;
    }

    play(timeStamp) {
        if (this.playCharTime === undefined) {
            this.playCharTime = timeStamp;
        }
        const elapse = timeStamp - this.playCharTime;
        if (elapse > FRAMES_TIME) {
            this.playCharTime = timeStamp;
            this.playCharacter(timeStamp);
        }
        super.play(timeStamp);
    }

    playCharacter(timeStamp) {
        if (super.isKilled()) { this.playDead(timeStamp); }
        else if (super.isHit()) { this.playHit(timeStamp); }
        else if (this.isAttacking()) { this.playAttack(timeStamp); }
        else if (super.isLaunching()) { this.playLuanch(timeStamp); }
        else if (super.isAboveGround() || this.speedY > 0) { this.playAboveGround(timeStamp); }
        else if (super.isMoving()) { this.playMove(timeStamp); }
        else { this.playStand(timeStamp); }
    }

    playDead(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['dead']);
    }

    playHit(timeStamp) {
        this.AUDIOS['hit'].play();
        super.playAnimation(timeStamp, this.IMAGES['hit']);
    }

    playLuanch(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['launch']);
        setTimeout(() => this.launching = false, 250);
    }

    playAboveGround(timeStamp) {
        if (super.isJumping()) { this.playJump(timeStamp); }
        if (super.isMitAir()) { this.playMitAir(timeStamp); }
        if (super.isLanding()) { this.playLanding(timeStamp); }
        if (super.isLanded()) { this.playLanded(timeStamp); }
    }

    playJump(timeStamp) {
        this.AUDIOS['jump'].play();
        super.playAnimation(timeStamp, this.IMAGES['jump']);
    }

    playMitAir(timeStamp) {
        // this.landing = false;
        // setTimeout(()=> this.landing = true, 100);
        super.playAnimation(timeStamp, this.IMAGES['midAir']);
    }

    playLanding(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['landing']);
    }

    playLanded(timeStamp) {
        this.AUDIOS['land'].play();
        this.landed = true;
        super.playAnimation(timeStamp, this.IMAGES['landed']);
    }

    playMove(timeStamp) {
        this.AUDIOS['move'].play();
        super.playAnimation(timeStamp, this.IMAGES['walking']);
    }

    playStand(timeStamp) {
        if (this.lastIdle == 0) {
            this.lastIdle = new Date().getTime();
        }
        let timePassed = new Date().getTime() - this.lastIdle;
        if (timePassed > 5000) {
            super.playAnimation(timeStamp, this.IMAGES['longIdle']);
        } else {
            super.playAnimation(timeStamp, this.IMAGES['idle']);
        }
    }

    playAttack(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['attack']);
        setTimeout(() => this.attacking = false, 250);
    }

    playLuanch(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['launch']);
    }

    hit() {
        this.lastIdle = 0;
        super.hit();
        this.hitPointsBar.setPercentage(this.energy);
    }

    kill() {
        this.lastIdle = 0;
        super.kill();
        this.hitPointsBar.setPercentage(this.energy);
    }
}