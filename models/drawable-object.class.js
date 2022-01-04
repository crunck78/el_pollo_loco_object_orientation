/**
 * A Skeleton Construction to be drawn on a 2d Canvas Context
 */
class DrawableObject {

    /**
     * @type {number} - Counts how many DrawableObject instances have been created
     */
    static count = 0;

    /**
     * @type {number} - Vertical Position
     */
    x = 0;

    /**
     * @type {number} - Horizontal Position
     */
    y = 0;

    /**
     * @type {number} - Vertical Size
     */
    width = 100;

    /**
     * @type {number} - Horizontal Size
     */
    height = 100;

    /**
     * @type {HTMLImageElement} - Image Element to be Drawn
     */
    img = new Image();

    /**
     * @type { object } - Key - Value Construct , where the key is the Path to a Image Resource
     *                      and the Value is a Image Element that loads the respective Image Resource
     */
    imageCache = {};

    /**
     * @type {number} - Index of a Array of Images Paths to query an images from @member imagesCache
     */
    currentImage = 0;

    /**
     * @type {number} - Depth measurement. Closer to 1 is closer to Screen, Closer to 0 is far from Screen
     */
    distance = 1;

    /**
     * @type {boolean} indicator mainly for fliping the image before drawing and back after drawing
     */
    otherDirection = false;

    /**
     * @type {number} - Indicator of the current value of @static @member count
     */
    id;

    constructor() {
        this.id = DrawableObject.count;
        DrawableObject.count++;
    }

    /**
     * @param {string} imgPath
     */
    loadImage(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawFrames(ctx) {
        if (this instanceof Character || this instanceof EndBoss) {
            this.drawImageFrame(ctx);
            //this.drawContextFrame(ctx);
            this.drawCoordinates(ctx);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawCoordinates(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.font = '48px serif';
        ctx.strokeText('x: ' + this.x + ' y: ' + this.y, this.x, this.y);
    }

    /**
     * @deprecated
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawContextFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';

        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();
    }

    drawImageFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    /**
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadAllImages() {
        for (const status in this.IMAGES) {
            this.loadImages(this.IMAGES[status]);
        }
    }
}