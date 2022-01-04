class EndBoss extends Enemy {

    offset = {
        top: 0,
        bottom: 30,
        left: 30,
        right: 30
    }

    movingLeft = false;
    movingRight = false;

    energy = 25;

    height = 400;
    width = 250;
    y = 55;
    x = 2500;

    speed = 10;
    groundPos = 60;

    playAnimationElapse = 200;

   AUDIOS = END_BOSS['AUDIOS'];
   IMAGES = END_BOSS['IMAGES'];

    constructor() {
        super().loadImage(this.IMAGES['WALKING'][0]);
        super.loadAllImages();
        this.hitPointsBar = new StatusBar(this.x, this.y, this.IMAGES['IMAGES_HIT_POINTS_BAR']);
        this.hitPointsBar.setPercentage(this.energy);
    }

    // loadAllImages() {
    //     for (const status in this.IMAGES) {
    //         super.loadImages(this.IMAGES[status]);
    //     }
    // }

    animate() {
        // super.startDirectionChange();
        super.animate();
    }

    stopAnimate() {
        // super.stopDirectionChange();
        super.stopAnimate();
    }

    play(timeStamp) {
        if (this.playBossTime === undefined) {
            this.playBossTime = timeStamp;
        }
        const elapse = timeStamp - this.playBossTime;
        if (elapse > FRAMES_TIME) {
            this.playBossTime = timeStamp;
            if (super.isKilled()) {
                this.playDead(timeStamp);
            } else if (super.isHit()) {
                this.playHit(timeStamp);
            } else if (super.isAlert()) {
                this.playAlert(timeStamp);
            } else if (super.isAttacking()) {
                this.playAttack(timeStamp);
            } else if (super.isMoving()) {
                this.playMove(timeStamp);
            } else {
                super.playAnimation(timeStamp, this.IMAGES['ALERT']);
            }
        }
        super.play(timeStamp);
    }

    playDead(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['DEAD']);
    }

    playHit(timeStamp) {
        this.AUDIOS['HIT'].play();
        super.playAnimation(timeStamp, this.IMAGES['HIT']);
    }

    playAlert(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['ALERT']);
    }

    playAttack(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['ATTACK']);
    }

    playMove(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['WALKING']);
    }

    move(timeStamp) {
        if (this.moveBossTime === undefined) {
            this.moveBossTime = timeStamp;
        }
        const elapse = timeStamp - this.moveBossTime;
        if (elapse > FRAMES_TIME) {
            this.moveBossTime = timeStamp;
            this.hitPointsBar.x = this.x;
            this.hitPointsBar.y = this.y;
            if (!super.isKilled()) {
                if (this.canAttack()) {
                    this.attack();
                }
                if (this.canMoveRight()) {
                    this.moveRight();
                }
                if (this.canMoveLeft()) {
                    this.moveLeft();
                }
            }
        }
        super.move(timeStamp);
    }

    canMoveRight() {
        return false;
    }

    isMovingRight() {
        return this.movingRight;
    }

    canMoveLeft() {
        return false;
    }

    isMovingLeft() {
        return this.movingLeft;
    }

    kill() {
        super.kill();
        this.hitPointsBar.setPercentage(this.energy);
    }

    hit() {
        super.hit();
        this.hitPointsBar.setPercentage(this.energy);
    }
}