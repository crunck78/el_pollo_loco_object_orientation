/**
 * A Construction to be drawn on a 2d Canvas Context
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
     * @type { {} } - Key - Value Construct , where the key is the Path to a Image Resource
     *                      and the Value is a Image Element that loads the respective Image Resource
     */
    imageCache = {};

    /**
     * @type {number} - Index of a Array of Images Paths to query an images from @member imagesCache
     */
    currentImage = 0;

    /**
     * @type {number} - Depth measurement. Closer to 1 is closer to Screen, Closer to 0 is far from Screen
     * Also influences how fast is this instance been translated 
     */
    distance = 1;

    /**
     * @type {boolean} indicator mainly for fliping the image before drawing and back after drawing
     * Also influences some animation and movement logic for this instance 
     */
    otherDirection = false;

    /**
     * @type {number} - Indicator of the current value of static @member count
     */
    id;

    constructor() {
        this.id = DrawableObject.count;
        DrawableObject.count++;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's @member img will be drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Help @function drawFrames, draws some useful info about this instance, like coordinates and @member image dimensions.
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
    drawFrames(ctx) {
        if (this instanceof Character || this instanceof EndBoss) {
            this.drawImageFrame(ctx);
            //this.drawContextFrame(ctx);
            this.drawCoordinates(ctx);
        }
    }

    /**
     * Help @function drawImageFrame, to visualize the instance's @member img frame dimensions.
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
    drawImageFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    /**
     * Help @function drawContextFrame, to visualize the context were this instance's @member img is been drawn.
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
    drawContextFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();
    }

    /**
     * Help @function drawCoordinates, to visualize coordinates values of this instance
     * @param {CanvasRenderingContext2D} ctx - the context where this instance's info will be drawn.
     */
     drawCoordinates(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.font = '48px serif';
        ctx.strokeText('x: ' + this.x + ' y: ' + this.y, this.x, this.y);
    }

    /**
     * Defines @member img and sets its src with the given image path
     * @param {string} imgPath - the image path to set this instance @member img to. Ex.: img/image1.png
     */
     loadImage(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }

    /**
     * For each image Path in @param arr, defines an Image, gives the path as its source
     * and saves the image path as key, and the Images as value to @member imageCache 
     * @param {string[]} arr - the collection of image paths Ex.: ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Help @function loadAllImages, given a Dictionary via @param images, of keys as names that best represent the values as image paths collection,
     * for each values, loads the image paths.
     * @param {object} images - object's all images. Ex. : images['WALKING'] = ['img/walking1.png', 'img/walking2.png'];
     */
    loadAllImages(images) {
        for (const status in images) {
            this.loadImages(images[status]);
        }
    }
}