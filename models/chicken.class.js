class Chicken extends Enemy {
    height = 55;
    width = 70;
    y = 360;
    x = 1000 + Math.random() * 500;
    speed = 0.15 + Math.random() * 0.5;
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
        this.animate();
    }

    animate() {
        setInterval(super.changeDirection.bind(this), 5000);
        super.animate();
    }

    play() {
        if (super.isDead()) {
            super.playAnimation(this.IMAGES_DEAD);
        } else {
            super.playAnimation(this.IMAGES_WALKING);
        }
    }
}