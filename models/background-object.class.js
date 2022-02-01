/**
 * An extension of DrawableObject. Representing an in game overlay.
 */
class BackgroundObject extends DrawableObject {
    width = CANVAS_WIDTH; 
    height = CANVAS_HEIGHT;
    y = 0;
    constructor(imagePath, x, distance = 1) {
        super().loadImage(imagePath);
        this.x = x;
        this.distance = distance;
    }
}