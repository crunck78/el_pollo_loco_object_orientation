class Character extends DestroyableObject {
    height = 250;
    x = 2400;
    y = 80;
    speed = 5;
    groundPos = 160;

    lastIdle = new Date().getTime();
    lastAttack = 0;

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
        super.loadAllImages();
        this.keyboard = new Keyboard();
        this.createStatusBars();
        //this.initX = super.x;
    }

    createStatusBars() {
        this.hitPointsBar = new StatusBar(30, 0, CHARACTER_ASSETS['IMAGES_HIT_POINTS_BAR']);
        this.hitPointsBar.setPercentage(this.energy);
        this.coinsBar = new StatusBar(30, 40, CHARACTER_ASSETS['IMAGES_COINS_BAR']);
        this.coinsBar.setPercentage(this.coins);
        this.bottlesBar = new StatusBar(30, 80, CHARACTER_ASSETS['IMAGES_BOTTLES_BAR']);
        this.bottlesBar.setPercentage(this.bottles);
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
        return this.isMovingRight() &&
            this.x < 720 * 4 &&
            !(super.isLaunching() || this.isAttacking());
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
        return this.isMovingLeft() &&
            this.x > 0 && // initial start x position
            !(super.isLaunching() || this.isAttacking());
    }

    isMovingRight() {
        return this.keyboard.RIGHT; // Poor Control should be fixed, this does not mean is moving right
    }

    moveLeft() {
        this.lastIdle = 0;
        super.moveLeft();
        super.otherDirection = true;
    }

    isMovingLeft() {
        return this.keyboard.LEFT; // Poor Control should be fixed, this does not mean is moving left
    }

    canLaunch() {
        return (this.keyboard.SPACE && !(super.isAboveGround() || this.launching));
    }

    launch() {
        this.lastIdle = 0;
        super.launch();
    }

    canAttack() {
        return this.keyboard.D &&
            this.keyboard.THROW_REQUEST_START > this.keyboard.THROW_REQUEST_STOP &&
            this.bottles > 0 &&
            !(super.isAboveGround() || super.isHit());
    }

    attack() {
        this.lastIdle = 0; //prevents instant idle
        this.attacking = true; //triggers playAttacking animation
        this.keyboard.THROW_REQUEST_STOP = new Date().getTime(); //stops attacking if attack button is been hold down
        let bottle = new ThrowableObject(this.x, this.y + 100, this.otherDirection);
        this.throwBottles.push(bottle);
        this.bottles -= 5;
        this.bottlesBar.setPercentage(this.bottles);
        setTimeout(()=>{ this.attacking = false; }, 250); //stops playAttacking after timeout
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
        else if (super.isLaunching()) { this.playLaunch(timeStamp); }
        else if (super.isAboveGround() || this.speedY > 0) { this.playAboveGround(timeStamp); }
        else if (super.isMoving()) { this.playMove(timeStamp); }
        else { this.playStand(timeStamp); }
    }

    playDead(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['DEAD']);
    }

    playHit(timeStamp) {
        this.AUDIOS['HIT'].play();
        super.playAnimation(timeStamp, this.IMAGES['HIT']);
    }

    playLaunch(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['LAUNCH']);
        setTimeout(() => this.launching = false, 250);
    }

    playAboveGround(timeStamp) {
        if (super.isJumping()) { this.playJump(timeStamp); }
        if (super.isMitAir()) { this.playMitAir(timeStamp); }
        if (super.isLanding()) { this.playLanding(timeStamp); }
        if (super.isLanded()) { this.playLanded(timeStamp); } //TODO
    }

    playJump(timeStamp) {
        this.AUDIOS['JUMP'].play();
        super.playAnimation(timeStamp, this.IMAGES['JUMP']);
    }

    playMitAir(timeStamp) {
        // this.landing = false;
        // setTimeout(()=> this.landing = true, 100);
        super.playAnimation(timeStamp, this.IMAGES['MID_AIR']);
    }

    playLanding(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['LANDING']);
    }

    playLanded(timeStamp) {
        this.AUDIOS['land'].play();
        this.landed = true;
        super.playAnimation(timeStamp, this.IMAGES['LANDED']);
    }

    playMove(timeStamp) {
        this.AUDIOS['MOVE'].play();
        super.playAnimation(timeStamp, this.IMAGES['WALKING']);
    }

    playStand(timeStamp) {
        if (this.lastIdle == 0) {
            this.lastIdle = new Date().getTime();
        }
        let timePassed = new Date().getTime() - this.lastIdle;
        if (timePassed > 5000) {
            super.playAnimation(timeStamp, this.IMAGES['LONG_IDLE']);
        } else {
            super.playAnimation(timeStamp, this.IMAGES['IDLE']);
        }
    }

    playAttack(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['ATTACK']);
        //setTimeout(() => this.attacking = false, 250);
    }

    playLaunch(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['LAUNCH']);
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

    isStamping(mo) {
        //most  likely to stamp an enemy
        // not exactly but does the job ... is just a soft simulation, not real life
        console.log(super.getBottomPos() - mo.getTopPos()); // Observations: every stamp done by individual jumps this will equal consecutive number between inclusive 1 - 20
        return /*this.isLanding() &&*/ super.getBottomPos() - mo.getTopPos() <= 20; //Tolerance 
        //this.isLanding causes the next mo check if is stamping to hit the character because is not landing anymore.  
    }
}