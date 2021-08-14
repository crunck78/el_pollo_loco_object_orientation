class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    y = 0;
    constructor(imagePath, x, distance = 1) {
        super().loadImage(imagePath);
        this.x = x;
        this.distance = distance;
    }
}