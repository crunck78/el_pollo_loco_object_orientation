/**
 * An extension of CollectibleObject. Representing a Bottle which the character can collect
 */
class Bottle extends CollectibleObject {
  width = 100;
  height = 100;

  groundPos = 340;

  offset = {
    top: 15,
    bottom: 30,
    left: 20,
    right: 15,
  };

  playAnimationElapse = 300;

  IMAGES = [
    'img/6.botella/2.Botella_enterrada1.png',
    'img/6.botella/2.Botella_enterrada2.png',
  ];

  /**
   *
   * @param {number} x vertical position
   * @param {number} y horizontal position
   */
  constructor(x, y, groundPos = 340) {
    super().loadImage('img/6.botella/2.Botella_enterrada1.png');
    super.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.groundPos = groundPos ? groundPos : 340;
  }

  /**
   * @override
   */
  animate() {
    super.startGravity();
    super.animate();
  }

  /**
   * @override
   */
  stopAnimate() {
    super.stopGravity();
    super.stopAnimate();
  }

  /**
   * @override
   * @param {number} timeStamp
   */
  play(timeStamp) {
    if (this.playBottleTime === undefined) {
      this.playBottleTime = timeStamp;
    }
    const elapse = timeStamp - this.playBottleTime;
    if (elapse > FRAMES_TIME) {
      this.playBottleTime = timeStamp;
      super.playAnimation(timeStamp, this.IMAGES);
    }
    super.play(timeStamp);
  }

  /**
   * @override
   * @param {number} timeStamp
   */
  move(timeStamp) {
    if (this.moveBottleTime === undefined) {
      this.moveBottleTime = timeStamp;
    }
    const elapse = timeStamp - this.moveBottleTime;
    if (elapse > FRAMES_TIME) {
      this.moveBottleTime = timeStamp;
      //HERE MOVE LOGIC
    }
    super.move(timeStamp);
  }
}
