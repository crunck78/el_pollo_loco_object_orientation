/**
 * An extension of Enemy, defines some specific Enemy Type to Character
 * They are very weak. They perform only simple self actions. 
 * They can hurt the Character on Collision if the Character does not Collide from top.
 * They can be instantly be killed if Character Collides from top.
 * They can be hurt if they Collide with Characters's throwing objects  
 */
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

    /**
     * @override @function animate
     */
    animate() {
        //super.startDirectionChange();
        super.animate();
    }

    /**
     * @override @function stopAnimate
     */
    stopAnimate() {
        //super.stopDirectionChange();
        super.stopAnimate();
    }

    /**
     * @override @function play
     * @param {number} timeStamp 
     */
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

    /**
     * @function playChicken , holds all the logic how a chicken's images are been played
     * @param {number} timeStamp 
     */
    playChicken(timeStamp){
        if (super.isKilled()) {
            this.playDead(timeStamp);
        } else {
            super.playAnimation(timeStamp, this.IMAGES['WALKING']);
        }
    }

    playDead(timeStamp){
        super.playAnimation(timeStamp, this.IMAGES['DEAD']);
        setTimeout(super.stopPlay.bind(this), this.playAnimationElapse * this.IMAGES['DEAD'].length);
    }

    /**
     * @override @function move
     * @param {number} timeStamp 
     */
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

    /**
     * @function moveChicken , holds all the login how a chicken should be moving
     * @param {number} timeStamp 
     */
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