class StatusBar extends DrawableObject {
  percentage = 100;
  x = 0;
  y = 0;
  width = 200;
  height = 60;

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {string[]} images
   * @param {number} distance
   */
  constructor(x, y, images, distance = 1) {
    super().loadImages(images);
    this.IMAGES = images;
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.setPercentage(0);
  }

  /**
   *
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage; // -> 0 ... 5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path].img;
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
