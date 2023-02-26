class EndBoss extends Enemy {

    damage = 40;

    offset = {
        top: 100,
        bottom: 30,
        left: 30,
        right: 30
    }

    energy = 100;

    height = 350;
    width = 250;
    y = 0;
    x = 2600;

    speedX = 3;
    groundPos = 110;

    playAnimationElapse = 550;

    chickens = [];

    AUDIOS = END_BOSS['AUDIOS'];
    IMAGES = END_BOSS['IMAGES'];

    constructor() {
        super().loadImage(this.IMAGES['IDLE'][0]);
        super.loadAllImages(this.IMAGES);
        this.lastPosX = this.x;
        this.hitPointsBar = new StatusBar(this.x, this.y, this.IMAGES['IMAGES_HIT_POINTS_BAR']);
        this.hitPointsBar.setPercentage(this.energy);
    }

    /**
     * @override
     */
    animate() {
        // super.startDirectionChange();
        super.animate();
    }

    /**
     * @override
     */
    stopAnimate() {
        // super.stopDirectionChange();
        super.stopAnimate();
    }

    /**
     * @override
     * @param {number} timeStamp
     */
    play(timeStamp) {
        if (this.playBossTime === undefined) {
            this.playBossTime = timeStamp;
        }
        const elapse = timeStamp - this.playBossTime;
        if (elapse > FRAMES_TIME) {
            this.playBossTime = timeStamp;
            this.playEndBoss(timeStamp);
        }
        super.play(timeStamp);
    }

    /**
     * Defines how a endboss's images are been played
     * @param {number} timeStamp
     */
    playEndBoss(timeStamp) {
        if (super.isKilled()) this.playDead(timeStamp);
        else if (super.isHit()) this.playHit(timeStamp);
        else if (this.attacking) this.playAttack(timeStamp);
        else if (this.alerted) this.playAlert(timeStamp);
        else if (super.isMovingHorizontally()) this.playMove(timeStamp);
        else this.playIdle(timeStamp);
    }

    /**
     *
     * @param {number} timeStamp
     */
    playDead(timeStamp) {
        this.playAnimationElapse = 300;
        super.playAnimation(timeStamp, this.IMAGES['DEAD']);
        setTimeout(() => { this.stopPlay(); }, this.playAnimationElapse * this.IMAGES['DEAD'].length * 2); //looks nicer for this animation
    }

    /**
     * @override
     */
    stopPlay() {
        delete this.hitPointsBar; //is this ok? draw asks anyway if object to draw exists
        super.stopGravity();
        super.stopPlay();
    }

    /**
     *
     * @param {number} timeStamp
     */
    playHit(timeStamp) {
        this.AUDIOS['HIT'].play();
        this.playAnimationElapse = 300;
        super.playAnimation(timeStamp, this.IMAGES['HIT']);
    }

    /**
     *
     * @param {number} timeStamp
     */
    playAlert(timeStamp) {
        this.playAnimationElapse = 300;
        super.playAnimation(timeStamp, this.IMAGES['ALERT']);
    }

    /**
     *
     * @param {number} timeStamp
     */
    playAttack(timeStamp) {
        this.playAnimationElapse = 300;
        super.playAnimation(timeStamp, this.IMAGES['ATTACK']);
    }

    /**
     *
     * @param {number} timeStamp
     */
    playMove(timeStamp) {
        this.playAnimationElapse = 300;
        super.playAnimation(timeStamp, this.IMAGES['WALKING']);
    }

    /**
     *
     * @param {number} timeStamp
     */
    playIdle(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['IDLE']);
        this.playAnimationElapse = 550;
    }

    /**
     * @override
     * @param {time} timeStamp
     */
    move(timeStamp) {
        if (this.moveBossTime === undefined) {
            this.moveBossTime = timeStamp;
        }
        const elapse = timeStamp - this.moveBossTime;
        if (elapse > FRAMES_TIME) {
            this.moveBossTime = timeStamp;
            this.moveEndBoss(timeStamp);
        }
        super.move(timeStamp);
    }

    /**
     * Defines how a endboss should be moving
     * @param {number} timeStamp
     */
    moveEndBoss(timeStamp) {
        if (!super.isKilled()) {
            this.moveEnemy();
        } else {
            this.launch(CANVAS_HEIGHT + this.height);
            setTimeout(() => { super.stopMove(); });
        }
    }

    /**
     * @override
     */
    moveEnemy() {
        super.moveEnemy();
        this.hitPointsBar.x = this.x;
        this.hitPointsBar.y = this.y;
    }

    /**
     *
     * @returns {boolean}
     */
    canMoveRight() {
        return false;
    }

    /**
     *
     * @returns {boolean}
     */
    canMoveLeft() {
        return false;
    }

    /**
     * @override
     */
    kill() {
        super.kill();
        this.hitPointsBar.setPercentage(this.energy);
    }

    /**
     * @override
     * @param {CollidableObject} target
     */
    hit(target) {
        super.hit(target);
        super.alert(target);
        this.hitPointsBar.setPercentage(this.energy);
    }


    attack() {
        super.attack();
        setTimeout(() => { this.createChicken(); }, 0);
        //find a timeout that creates a new chicken when attack images are playing and the fly image is played
        //for this purpose , when attack animations begin to play, currentImg should be 0, then multiply the time it takes to
        //draw a image times the position of fly image in the attack images array
        setTimeout(() => { this.createChicken(); }, 1000);
    }

    /**
     *
     */
    createChicken() {
        let newChicken = new Chicken(this.x, 0,this.otherDirection);
        newChicken.speedX = 2;
        newChicken.animate();
        this.chickens.push(newChicken);
    }
}