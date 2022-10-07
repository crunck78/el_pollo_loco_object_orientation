/**
 * Represents a Managing Class for a Level Design.
 * It holds the reference to all instanceof DrawableObjects to be draw on screen.
 *
 */
class Level {
    /**
     * How Long is the playground.
     * @type {number}
     */
    level_end_x;

    /**
     * A Collection of AudioElements
     * @type {object}
     */
    AUDIOS = LEVEL_ASSETS['AUDIOS'];

    /**
     * The Hero of our Story. The playable Character.
     * @type {Pepe}
     */
    character;

    /**
     * the Nemesis. The Big Boss to be Defeated by our Hero.
     * @type {BigChicken}
     */
    endBoss;

    /**
     * Collection of Chicken that the Game Level Starts with.
     * @type {Chicken[]}
     */
    enemies;

    /**
     * Collection of Cloud for simulating cloudy Day.
     * @type {Cloud[]}
     */
    clouds;

    /**
     * Colleciton of Backgrounds that defines the Level Design.
     * Each Section of Level constitute of more overlapping Backgrounds.
     * Where one Section is as long as the Canvas.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;

    /**
     * Collection of Coins that the level starts with.
     * They can be Collected by our Hero.
     * @type {Coin[]}
     */
    coins;

    /**
     * Collection of Bottles that the level starts with.
     * They can be Collected by our Hero.
     * Our Hero can used them as a Weapon by trying to hit his enemies with them.
     * @type {Bottle[]}
     */
    bottles;

    /**
     * The Background that it used to clear the Canvas for next drawing.
     * @type {BackgroundObject}
     */
    clearRect;

    /**
     * The concatenation of all DrawableObjects in the game.
     */
    allObjects;

    /**
     *
     * @param {Chicken[]} enemies
     * @param {Cloud[]} clouds
     * @param {BackgroundObject[]} backgroundObjects
     * @param {Coin[]} coins
     * @param {Bottle[]} bottles
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, platforms) {

        this.character = new Pepe();
        this.endBoss = new BigChicken();
        this.clearRect = new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0, 0);
        this.endScreen; // Defined when game ends
        this.winScreen = new BackgroundObject('img/9.Intro _ Outro Image/_Game over_ screen/3.Game over.png', 0, 0);
        this.loseScreen = new BackgroundObject('img/9.Intro _ Outro Image/_Game over_ screen/1.you lost.png', 0, 0);
        this.enemies = enemies;
        this.enemies.push(this.endBoss);
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.platforms = platforms;

        this.allObjects = this.getAllObjects();
        this.movableObjects = this.getObjectsByClassName(this.allObjects, MovableObject);
        this.collidableObjects = this.getObjectsByClassName(this.allObjects, CollidableObject);
        this.destroyableObjects = this.getObjectsByClassName(this.allObjects, DestroyableObject);
        this.collectableObjects = this.getObjectsByClassName(this.allObjects, CollectibleObject);

        /**
         * this.backgrounds[0,1,2] and this.backgrounds[this.background.length - 1, -2, -3] do not count
         * they are used as extremes, as out of Level Areas, that is why - 1
         * Divided by 3 because , 3 Backgrounds Overlap, they are on the same x position
         * Times CANVAS_WIDTH because one Background width equals CANVAS_WIDTH
         */
        this.level_end_x = (this.backgroundObjects.length / 3 - 1) * CANVAS_WIDTH;
    }

    /**
     * Wrapper @function animateAll ,for each Object that can be animated starts its @function animate
     */
    animateAll() {
        this.AUDIOS['BACKGROUND'].play();
        this.character.animate();
        this.animateCollection(this.character.throwBottles);
        this.animateCollection(this.endBoss.chickens);
        this.animateCollection(this.enemies);
        this.animateCollection(this.coins);
        this.animateCollection(this.bottles);
        this.animateCollection(this.clouds);
    }

    animateCollection(array) {
        array.forEach(element => {
            element.animate();
        });
    }

    /**
     * Wrapper @function animateAll ,for each Object that can be animated stops its @function animate
     */
    stopAnimateAll() {
        this.AUDIOS['BACKGROUND'].pause();
        this.character.stopAnimate();
        this.stopAnimateCollection(this.character.throwBottles);
        this.stopAnimateCollection(this.endBoss.chickens);
        this.stopAnimateCollection(this.enemies);
        this.stopAnimateCollection(this.coins);
        this.stopAnimateCollection(this.bottles);
        this.stopAnimateCollection(this.clouds);
    }

    stopAnimateCollection(array) {
        array.forEach(element => {
            element.stopAnimate();
        });
    }

    /**
     * Returns a concatenation of all levels Objects in the order of Drawing
     * @returns {array}
     */
    getAllObjects() {
        return [
            this.clearRect,
            ...this.backgroundObjects,
            ...this.platforms,
            ...this.clouds,
            ...this.coins,
            ...this.bottles,
            ...this.enemies,
            ...this.endBoss.chickens,// does not work array is spread
            ...this.character.throwBottles,//does not work array is spread
            ...[
                this.character,
                this.character.hitPointsBar,
                this.character.coinsBar,
                this.character.bottlesBar,
                this.endBoss.hitPointsBar
            ]
        ];
    }

    /**
     * Filters out @param collection for instances of @param className type
     * @param {any[]} collection a collection of instances
     * @param {className} className
     * @returns {any[]} - A Collection of instances className
     */
    getObjectsByClassName(collection ,className) {
        return collection.filter(o => o instanceof className);
    }

    muteSounds() {
        this.AUDIOS['BACKGROUND'].volume = 0;
    }

    unmuteSounds() {
        this.AUDIOS['BACKGROUND'].volume = 1;
    }
}