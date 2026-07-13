/**
 * Representing an in game overlay or layout of the Level.
 */
class BackgroundObject extends DrawableObject {
  width = CANVAS_WIDTH;
  height = CANVAS_HEIGHT;
  y = 0;

  /**
   *
   * @param {string} imagePath
   * @param {number} x
   * @param {number} distance
   */
  constructor(imagePath, x, distance = 1) {
    super().loadImage(imagePath);
    this.x = x;
    this.distance = distance;
  }
}
