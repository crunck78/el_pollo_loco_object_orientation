class BackgroundObject extends DrawableObject {
    width = 720; //same as canvas
    height = 480;//same as canvas
    y = 0;
    constructor(imagePath, x, distance = 1) {
        super().loadImage(imagePath);
        super.x = x;
        super.distance = distance;
    }
}