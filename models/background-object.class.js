class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    y = 0;
    constructor(imagePath, x, distance = 1) {
        super().loadImage(imagePath);
        super.x = x;
        super.distance = distance;
    }
}