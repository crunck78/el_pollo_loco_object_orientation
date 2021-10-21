class Cloud extends MovableObject {
    y = 50;
    x = Math.random() * 500; //Zahl zwieschen 0 und 500
    width = 500;
    height = 250;
    constructor(width, height) {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.width = width;
        this.height = height;
        super.animate();
    }

    move(){
        super.moveLeft();
    }

    play(){
        
    }
}