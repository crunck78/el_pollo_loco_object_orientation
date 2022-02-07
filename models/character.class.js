/**
 * An extension of Creature. It is a playable Character that can be controlled via keyboard.
 * It can walk, jump, throw objects.
 * Power, it can squish any Enemy it lands on.
 */
class Character extends Creature {

    damage = 20;

    height = 250;
    x = 0;
    y = 80;
    speedX = 5;
    groundPos = 171;

    lastIdle = new Date().getTime();
    lastAttack = 0;

    bottles = 0;
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
    PROPERTIES = CHARACTER_ASSETS['PROPERTIES'];

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        super.loadAllImages(this.IMAGES);
        this.keyboard = new Keyboard();
        this.createStatusBars();
        //this.initX = super.x;
    }

    createStatusBars() {
        this.hitPointsBar = new StatusBar(30, 0, CHARACTER_ASSETS['IMAGES_HIT_POINTS_BAR'], 0);
        this.hitPointsBar.setPercentage(this.energy);
        this.coinsBar = new StatusBar(30, 40, CHARACTER_ASSETS['IMAGES_COINS_BAR'], 0);
        this.coinsBar.setPercentage(this.coins);
        this.bottlesBar = new StatusBar(30, 80, CHARACTER_ASSETS['IMAGES_BOTTLES_BAR'], 0);
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
        }else{
            //STOP MOVE DOES NOT WORK IT IS STILL RUNNING
            //SET TIMEOUT SOLVES THE PROBLEM BUT WHY??? 
            this.launch(CANVAS_HEIGHT + this.height);
            setTimeout(super.stopMove.bind(this));
        }
    }

    canMoveRight() {
        return this.isMovingRight() &&
            this.x < CANVAS_WIDTH * 4 &&
            !(this.launching || this.attacking || this.landed);
    }

    moveRight() {
        this.lastIdle = 0;
        super.moveRight();
        super.otherDirection = false;
    }

    canMoveLeft() {
        return this.isMovingLeft() &&
            this.x > 0 &&
            !(this.launching || this.attacking || this.landed);
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
        return (this.keyboard.SPACE && !(super.isAboveGround() || this.launching || this.landed));
    }

    /**
     * 
     * @param {number} groundPos - new  groundPos  
     */
    launch(groundPos) {
        this.lastIdle = 0;
        super.launch(groundPos);
    }

    land(){
        this.lastIdle = 0;
        super.land();
    }

    canAttack() {
        return this.keyboard.D &&
            this.keyboard.THROW_REQUEST_START > this.keyboard.THROW_REQUEST_STOP &&
            this.bottles > 0 &&
            !(super.isAboveGround() || super.isHit() || this.landed);
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

    /**
     * Instant kills an enemy, which performs a followup launch
     * @param {Enemy} enemy - the enemy to be killed on stamp
     */
    stamp(enemy){
        enemy.kill('STAMP');
        this.groundPos = this.y;
        this.speedY = 0;
        this.launch();
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
        else if (this.attacking) { this.playAttack(timeStamp); }
        else if (this.landed) { this.playLanded(timeStamp); }
        else if (this.launching) { this.playLaunch(timeStamp); }
        else if (super.isAboveGround() || this.speedY > 0) { this.playAboveGround(timeStamp); }
        else if (super.isMovingHorizontally()) { this.playMove(timeStamp); }
        else { this.playStand(timeStamp); }
    }

    playDead(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['DEAD']);
        setTimeout(this.stopPlay.bind(this), this.playAnimationElapse * this.IMAGES['DEAD'].length);
    }

    /**
     * @override @function stopPlay
     */
    stopPlay(){
        // delete this.hitPointsBar;
        // delete this.coinsBar;
        // delete this.bottlesBar;
        super.stopGravity();
        super.stopPlay();
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
        this.AUDIOS['LAND'].play();
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

    hit(damage) {
        this.lastIdle = 0;
        super.hit(damage);
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
        // console.log(super.getBottomPos() - mo.getTopPos()); // Observations: every stamp done by individual jumps this will equal consecutive number between inclusive 1 - 20
        return /*this.isLanding() &&*/ super.getBottomPos() - mo.getTopPos() <= 20; //Tolerance may vary on different browsers and or machines config 
        //this.isLanding causes the next mo check if is stamping to hit the character because is not landing anymore.  
    }
}