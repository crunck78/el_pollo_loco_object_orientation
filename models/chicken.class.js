class Chicken extends Enemy {
    height = 55;
    width = 70;
    energy = 5;
    y = 360;
    x = 1000 + Math.random() * 500;
    speed = 0.15 + Math.random() * 0.5;

    AUDIOS = {
        stamp: new Audio('audio/rubber_chicken.mp3'),
        kill: new Audio('audio/chicken.mp3')
    }

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    IMAGES_DEAD = ['img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'];
    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);
    }

    animate() {
        super.startDirectionChange();
        super.animate();
    }

    stopAnimate() {
        super.stopDirectionChange();
        super.stopAnimate();
    }

    play(timeStamp) {
        if(this.playChickenTime === undefined){
            this.playChickenTime = timeStamp;
        }
        const elapse = timeStamp - this.playChickenTime;
        if (elapse > FRAMES_TIME) {
            this.playChickenTime = timeStamp;
            if (super.isKilled()) {
                super.playAnimation(timeStamp, this.IMAGES_DEAD);
            } else {
                super.playAnimation(timeStamp, this.IMAGES_WALKING);
            }
        }
        super.play(timeStamp);
    }

    move(timeStamp) {
        if(this.moveChickenTime === undefined){
            this.moveChickenTime = timeStamp;
        }
        const elapse = timeStamp - this.moveChickenTime;
        if (elapse > FRAMES_TIME) {
            this.moveChickenTime = timeStamp;
            if (!super.isKilled()) {
                if (this.otherDirection) { //interesting ... super methods call behave as i expacted ...  but super fileds call does not work
                    super.moveRight();
                }
                else {
                    super.moveLeft();
                }
            }
        }
        super.move(timeStamp);
    }
}