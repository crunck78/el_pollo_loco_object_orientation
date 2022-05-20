/**
 * 
 */
class World {

    /**
     * Layout to be show when game ends.
     */
    endScreen;

    /**
     * Value that determines what is the ground level. 
     * @type {number} 
     */
    groundPos = 400;

    /**
     * Value by which is check the game status and react accordingly
     * @type {string}
     */
    gameStatus = 'inProgress';

    /**
     * @type {number}
     */
    cameraOffsetX = 0;

    /**
     * Value by which is @this @member ctx on Horizontal translated  
     * @type {number}
     */
    camera_x = 0;

    /**
     * A long integer value, the request id, that uniquely identifies the entry in the callback list.
     *  This is a non-zero value, but you may not make any other assumptions about its value.
     *  You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
     * @type {number}
     */
    requestDraw;

    /**
    * Measuring time passing variable in ms for running code inside recursive @function draw
    * only after at least this amount off time has passed. ( replaced By FRAMES_TIME @global )
    * @type {number}
    */
    drawTime;

    /**
    * A long integer value, the request id, that uniquely identifies the entry in the callback list.
    *  This is a non-zero value, but you may not make any other assumptions about its value.
    *  You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
    * @type {number}
    */
    requestCheckWorld;

    /**
    * Measuring time passing variable in ms for running code inside recursive @function check
    * only after at least this amount off time has passed. ( replaced By FRAMES_TIME @global )
    * @type {number}
    */
    checkWorldTime;

    /**
     * The context were @member level's DrawableObjects are been drawn
     * @type {CanvasRenderingContext2D}
     */
    ctx

    constructor() {
        this.level = getLevel1();
        this.ctx = document.getElementById('canvas').getContext('2d');
    }

    /**
     * Wrapper @function run, starts all recursive function in the game.
     */
    run() {
        this.level.animateAll();
        this.startCheck();
        this.startDraw();
    }

    /**
     * Wrapper @function stop, stops all recursive function in the game.
     */
    stop() {
        this.level.stopAnimateAll();
        this.stopCheck();
        this.stopDraw();
    }

    /**
     * Starts the recursive @function check
     */
    startCheck() {
        this.requestCheckWorld = requestAnimationFrame(this.check.bind(this));
    }

    /**
     * Stops the recursive @function check
     */
    stopCheck() {
        cancelAnimationFrame(this.requestCheckWorld);
    }

    /**
     * Starts the recursive @function draw
     */
    startDraw() {
        this.requestDraw = requestAnimationFrame(this.draw.bind(this));
    }

    /**
     * Stops the recursive @function draw
     */
    stopDraw() {
        cancelAnimationFrame(this.requestDraw);
    }

    /**
     * This recursive @function check, calls @this @method checkWorld only after @constant FRAMES_TIME has passed
     * @param {number} timeStamp 
     */
    check(timeStamp) {
        if (this.checkWorldTime === undefined) {
            this.checkWorldTime = timeStamp
        }
        const elapse = timeStamp - this.checkWorldTime;
        if (elapse >= FRAMES_TIME) {
            this.checkWorldTime = timeStamp;
            this.checkWorld(timeStamp);
        }
        this.requestCheckWorld = requestAnimationFrame(this.check.bind(this));
    }

    /**
     * Wrapper @function checkWorld, to call different, multiple in game check functions.
     * @param {number} timeStamp 
     */
    checkWorld(timeStamp) {
        this.checkProgress();
        this.checkCameraTest(this.level.character);
        this.checkAlertEnemies();
        this.checkCollisions();
        //this.checkCollisionsTest();
    }

    checkProgress(){
        let result = this.isGameOver();
        if(result){
            setTimeout(this.stopCheck.bind(this));
            setTimeout(()=>{
                this.level.endScreen = result == 'WIN' ? this.level.winScreen : this.level.loseScreen;
            },1000)
        }
    }

    /**
     * Test @function checkCameraTest same as @function checkCamera
     * on right movement or left movement, target is position some offset from middle screen,
     * opposed to movement direction.
     */
    checkCameraTest(target) {
        let targetCenterX = target.x + target.width * 0.5;
        let canvasCenterX = this.ctx.canvas.width * 0.5;
        let distanceFromCamera = targetCenterX - this.cameraOffsetX;

        if (this.canMoveCamera(canvasCenterX, this.level.level_end_x - canvasCenterX, distanceFromCamera)) {
            this.camera_x = -(distanceFromCamera - canvasCenterX);
            if (target.isMovingRight() && targetCenterX + this.camera_x >= canvasCenterX * 0.5) {
                this.cameraOffsetX -= 3;
            }
            if (target.isMovingLeft() && targetCenterX + this.camera_x <= this.ctx.canvas.width - canvasCenterX * 0.5) {
                this.cameraOffsetX += 3;
            }
        }
    }

    /**
     * Check if camera target is inside Boundaries to allow camera movement 
     * @param {number} leftBoundary - minium distance for target to achieve for camera to move.
     * @param {number} rightBoundary - maximum distance for target to achieve for camera to move.
     * @param {number} distanceFromCamera - how far is the camera's offset from target
     * @returns {boolean}
     */
    canMoveCamera(leftBoundary, rightBoundary, distanceFromCamera) {
        return distanceFromCamera > leftBoundary &&
            distanceFromCamera < rightBoundary;
    }

    /**
     *  If horizontal moving @param target passes one half the canvas at begin,
     *  or has not reached  level end minus one half the canvas,
     *  this instance @member camera_x is updated to keep the @param target in the middle of the screen.
     */
    checkCamera(target) {
        let targetCenterX = target.x + target.width * 0.5;
        let canvasCenterX = this.ctx.canvas.width * 0.5;

        if (targetCenterX > canvasCenterX && targetCenterX < this.level.level_end_x - canvasCenterX) {
            this.camera_x = -(targetCenterX - canvasCenterX);
        }
    }

    /**
     * If Character is in Enemy alert Distance range, enemy will be alerted if it can be alerted
     */
    checkAlertEnemies() {
        if (this.level.endBoss.canAlert() &&
            !this.level.character.isKilled()
            && this.level.endBoss.distanceFromOffsetX(this.level.character) < this.level.endBoss.alertDistance
        ) {
            this.level.endBoss.alert(this.level.character);
        }
    }

    /**
     * Wrapper @function checkCollisions , calls different collision check functions.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index, enemies) => this.checkEnemyCollisions(enemy, index, enemies));
        this.level.endBoss.chickens.forEach((chicken, index, chickens) => this.checkEnemyCollisions(chicken, index, chickens));
        this.checkCollisionsWithCollectibles(this.level.coins);
        this.checkCollisionsWithCollectibles(this.level.bottles);
    }

    /**
     * Wrapper @function checkCollisionsTest , calls different collision check functions.
     */
    checkCollisionsTest() {
        //TODO 
        let allObjects = this.level.getAllObjects();
        let collidabels = this.level.getObjectsByClassName(allObjects, CollidableObject);
        
    }

    /**
     * Check if @param enemy is colliding with some specific targets.
     * @param {Enemy} enemy - instanceof Enemy to check if is Colliding with specific other target Objects
     * @param {number} index - the indexOf @param enemy in @param collection
     * @param {Enemy[]} collection - the Array that holds a reference to @param enemy 
     */
    checkEnemyCollisions(enemy, index, collection) {
        this.checkEnemyCharacterCollision(enemy, index, collection);
        this.level.character.throwBottles.forEach(throwObj => this.checkThrowEnemyCollision(throwObj, enemy, collection));
    }

    /**
     * Check if player is colliding with @param enemy 
    * @param {Enemy} enemy - instanceof Enemy to check if is Colliding with specific other target Objects
    * @param {number} index - the indexOf @param enemy in @param collection
    * @param {Enemy[]} collection - the Array that holds a reference to @param enemy 
    */
    checkEnemyCharacterCollision(enemy, index, collection) {
        if (enemy.canCollide() &&  this.level.character.canCollide() && this.level.character.isColliding(enemy)) {
            if (this.level.character.isStamping(enemy)) {
                this.level.character.stamp(enemy);
                if (enemy.isKilled()) { // this should anyways happen
                    this.spliceTimeout(collection, enemy);
                }
            } else {
                this.level.character.hit(enemy.damage);
            }
        }
    }

    /**
     * @deprecated - Validates a collision between enemy and char
     * @param {Enemy} enemy 
     * @param {Character} char 
     * @returns {boolean}
     */
    canCollide(enemy, char) {
        return !(char.isKilled() || enemy.isKilled() || char.isHit())
    }

    /**
     * Validates a collision between a throwObj and a enemy
     * @param {ThrowableObject} throwObj 
     * @param {Enemy} enemy 
     * @returns {boolean}
     */
    canHit(throwObj, enemy) {
        return !(enemy.isKilled() || enemy.isHit() || throwObj.broken);
    }

    /**
     * @function checkThrowEnemyCollision, checks if player used projectile @param throwObj hits @param enemy from @param collection  
     * @param {ThrowableObject} throwObj - an instanceof of ThrowableObject that the player can use as a projectile to hit enemies 
     * @param {Enemy} enemy - instanceof Enemy to check if is Colliding with @param throwObj
     * @param {Enemy[]} collection - the Array that holds a reference to @param enemy 
     */
    checkThrowEnemyCollision(throwObj, enemy, collection) {
        if (this.canHit(throwObj, enemy) && throwObj.isColliding(enemy)) {
            //throwObj.hit();
            throwObj.break();
            this.spliceTimeout(this.level.character.throwBottles, throwObj);
            enemy.hit(this.level.character);
            //TODO BUILD A COLLECTOR OF ALL KILLED OR DESTROYED OBJECTS TO DELETE THEM
            if (enemy.isKilled()) {
                this.spliceTimeout(collection, enemy);
            }
        }
    }

    /**
     * Calls @function delete after a 2 seconds time out to delete @param mo from @param array
     * @param {DrawableObject[]} array - holds a reference to @param mo
     * @param {DrawableObject} mo - ist referenced by @param array 
     */
    spliceTimeout(array, mo) {
        setTimeout(this.delete.bind(this, array, mo), 2000);
    }

    /**
     * Deletes @param mo from @param array
     * @param {DrawableObject[]} array - holds a reference to @param mo
     * @param {DrawableObject} mo - ist referenced by @param array 
     */
    delete(array, mo) {
        let position = array.indexOf(mo);
        // mostly are handled in the highest class instance
        //mo.stopAnimate(); // first fix ... stops recursive  functions after no longer Object is needed
        array.splice(position, 1);
    }

    /**
     * @param {CollectibleObject[]} collectibles 
     */
    checkCollisionsWithCollectibles(collectibles) {
        collectibles.forEach((collectible, index) => {
            if (this.level.character.isColliding(collectible) && this.hasCollect(collectible)) {
                collectible.stopAnimate(); // first fix ... stops recursive  functions after no longer Object is needed
                collectibles.splice(index, 1);
            }
        });
    }

    /**
     * @param {CollectibleObject} collectible - 
     * @returns {boolean}
     */
    hasCollect(collectible) {
        if (collectible instanceof Coin && this.level.character.coins < 100) {
            this.collectCoin();
            return true;
        }
        if (collectible instanceof Bottle && this.level.character.bottles < 100) {
            this.collectBottle();
            return true;
        }
        return false;
    }

    /**
     * Play collect audio, updates status bar.
     */
    collectCoin() {
        this.level.character.AUDIOS['COIN'].play();
        this.level.character.coins += 5;
        this.level.character.coinsBar.setPercentage(this.level.character.coins);
    }

    /**
     * Play collect audio, updates status bar.
     */
    collectBottle() {
        this.level.character.AUDIOS['BOTTLE'].play();
        this.level.character.bottles += 5;
        this.level.character.bottlesBar.setPercentage(this.level.character.bottles);
    }

    /**
     * This recursive @member draw calls drawing functions only after @constant FRAMES_TIME has passed
     * @param {number} timeStamp 
     */
    draw(timeStamp) {
        if (this.drawTime === undefined) {
            this.drawTime = timeStamp;
        }
        const elapse = timeStamp - this.drawTime;
        if (elapse > FRAMES_TIME) {
            this.drawTime = timeStamp;
            this.drawGameInProgress();
        }
        this.requestDraw = requestAnimationFrame(this.draw.bind(this));
    }

    /**
     * @function drawGameInProgress , draws all in instance level defined DrawableObjects to this instance @member ctx
     */
    drawGameInProgress() {

        this.addToMap(this.level.clearRect);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.endBoss.chickens);
        this.addToMap(this.level.endBoss.hitPointsBar);

        this.addToMap(this.level.character);
        this.addObjectsToMap(this.level.character.throwBottles);
        this.addToMap(this.level.character.hitPointsBar);
        this.addToMap(this.level.character.coinsBar);
        this.addToMap(this.level.character.bottlesBar);

        this.addToMap(this.level.endScreen);
    }

    isGameOver() {
        if(this.level.character.isKilled()){
            return 'LOOSE';
        } 

        if(this.level.endBoss.isKilled()){
            return 'WIN';
        }
        return false; // game not ended
    }

    /**
     * Wrapper @function addObjectsToMap calls @function addToMap for each instanceof DrawableObject in @param objects
     * @param {DrawableObject[]} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws the @param mo on this instance @member ctx and performs after and before conditional changes,
     * like flip image or context translations.
     * Each before draw change in this instance @member ctx should be reversed apply after draw.
     * @param {DrawableObject} mo
     */
    addToMap(mo) {
        if (mo && this.insideCanvas(mo)) { //because of delete use , we ask if mo is defined
            this.ctx.translate(this.camera_x * mo.distance, 0);
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx);
            mo.drawFrames(this.ctx);
            if(mo instanceof CollidableObject)
                mo.drawHitBoxFrame(this.ctx);
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            this.ctx.translate(-this.camera_x * mo.distance, 0);
        }
    }

    flipImage(mo) {
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Gives back if the @param mo's Horizontal position is inside Canvas
     * @param {DrawableObject} mo 
     * @returns {boolean}
     */
    insideCanvas(mo) {
        let translate = this.camera_x * mo.distance;
        return mo.x + mo.width + translate > 0 &&
            mo.x + translate < CANVAS_WIDTH;
    }

    /**
     * Help @function muteSounds to stop loop audios from playing
     */
    muteSounds() {
        this.level.muteSounds();
    }

    /**
     * Help @function unmuteSounds to start loop audios to play
     */
    unmuteSounds() {
        this.level.unmuteSounds();
    }

    /**
     * Help @function drawLine
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     */
    drawLine(x1, y1, x2, y2) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.restore();
    }
}