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

    AUDIOS = {
        hit: new Audio('audio/chicken.mp3'),
        kill: new Audio('audio/chicken.mp3')
    }

    IMAGES_ALERT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
    ];
    IMAGES_WALKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'
    ];
    IMAGES_HIT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ];

    IMAGES_HIT_POINTS_BAR = [
        'img/7.Marcadores/Barra/Marcador vida/Naranja/0_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/20__1.png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/40_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/60_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/80_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/100_ .png'
    ];
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages();
        this.hitPointsBar = new StatusBar(this.x, this.y, this.IMAGES_HIT_POINTS_BAR);
        this.hitPointsBar.setPercentage(this.energy);
    }

    loadImages() {
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_ALERT);
        super.loadImages(this.IMAGES_ATTACK);
        super.loadImages(this.IMAGES_HIT);
        super.loadImages(this.IMAGES_DEAD);
    }

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
                super.playAnimation(timeStamp, this.IMAGES_ALERT);
            }
        }
        super.play(timeStamp);
    }

    playDead(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_DEAD);
    }

    playHit(timeStamp) {
        this.AUDIOS['hit'].play();
        super.playAnimation(timeStamp, this.IMAGES_HIT);
    }

    playAlert(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_ALERT);
    }

    playAttack(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_ATTACK);
    }

    playMove(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES_WALKING);
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