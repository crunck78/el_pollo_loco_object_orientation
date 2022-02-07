/**
 * An extension of DestroyableObject. Represents an Object that a Character can throw.
 * On Collision with other objects or ground contact it breaks.
 * If collides with Enemies deals damage.
 */
class ThrowableObject extends DestroyableObject {

    damage = 20;

    height = 100;
    width = 60;
    speedY = 10;
    speedX = 10;
    groundPos = 380;
    acceleration = 2.5;
    playTime = 200;
    energy = 5;
    broken = false;

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }

    playAnimationElapse = 60;

    AUDIOS = THROWABLE_OBJECT_ASSETS['AUDIOS'];
    IMAGES = THROWABLE_OBJECT_ASSETS['IMAGES'];

    // Created as a Bottle is been throw
    constructor(x, y, otherDirection) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        super.loadImages(this.IMAGES['ROTATION_BOTTLE']);
        super.loadImages(this.IMAGES['SPLASH']);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.AUDIOS['THROW'].play();
        this.animate();
    }

    break() {
        this.broken = true;
        //first resolve ... but it can be better
        //setting groundPos to y the throwable object gravity does not apply 
        //or isAboveGround() is false
        this.groundPos = this.y + 50; //to look like it breaks on the object ist collide with add some offset
    }

    // break(target){
    //     if(target && target instanceof DestroyableObject){
    //         target.hit(this.damage);
    //     }
    //     this.broken = true;
    //     this.groundPos = this.y + 50;
    //     this.x = target.x;
    // }

    /**
     * @override @function animate
     */
    animate() {
        super.startGravity();
        super.animate();
    }

    /**
     * @override @function stopAnimate
     */
    stopAnimate() {
        super.stopGravity();
        super.stopAnimate();
    }

    /**
     * @override @function play
     * @param {number} timeStamp 
     */
    play(timeStamp) {
        if (this.playThrowObjectTime === undefined) {
            this.playThrowObjectTime = timeStamp;
        }
        const elapse = timeStamp - this.playThrowObjectTime;
        if (elapse > FRAMES_TIME) {
            this.playThrowObjectTime = timeStamp;
            this.playThrowObject(timeStamp);
        }
        super.play(timeStamp);
    }

    /**
     * @function playThrowObject , holds all the logic how a throwable-object's images are been played
     * @param {number} timeStamp 
     */
    playThrowObject(timeStamp) {
        if (super.isAboveGround()) {
            super.playAnimation(timeStamp, this.IMAGES['ROTATION_BOTTLE']);
        }
        else {
            this.playBreak(timeStamp);
        }
    }

    playBreak(timeStamp) {
        super.playAnimation(timeStamp, this.IMAGES['SPLASH']);
        setTimeout(super.stopPlay.bind(this), this.playAnimationElapse * this.IMAGES['SPLASH'].length);

    }

    move(timeStamp) {
        if (this.moveThrowObjectTime === undefined) {
            this.moveThrowObjectTime = timeStamp;
        }
        const elapse = timeStamp - this.moveThrowObjectTime;
        if (elapse > FRAMES_TIME) {
            this.moveThrowObjectTime = timeStamp;
            this.moveThrowObject(timeStamp);
        }
        super.move(timeStamp);
    }

    /**
     * @function moveThrowObject , holds all the login how a throwable-object should be moving
     * @param {number} timeStamp 
     */
    moveThrowObject(timeStamp) {
        if (super.isAboveGround()) {
            if (this.otherDirection) { super.moveLeft(); }
            else { super.moveRight(); }
        } else {
            setTimeout(this.stopMove.bind(this));
        }
    }

    stopMove() {
        this.broken = true;
        this.AUDIOS['BREAK'].play();
        this.playAnimationElapse = 100;
        super.stopGravity();
        super.stopMove();
    }

    /**
     * @function isBroken named like this for better semantic
     * @returns {boolean}
     */
    isBroken() {
        return super.isKilled();
    }

    hit() {
        super.hit();
        this.break();
    }
}