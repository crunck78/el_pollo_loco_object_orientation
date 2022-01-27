class World {

    /**
     * @type {number}
     */
    cameraSpeedX = 0;

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
        this.checkCameraTest();
        this.checkAlertEnemies();
        this.checkCollisions();
    }

    /**
     * 
     */
    checkCameraTest() {
        let charCenterX = this.level.character.x + this.level.character.width * 0.5;
        let canvasCenterX = this.ctx.canvas.width * 0.5;
        if ((charCenterX - this.cameraSpeedX) > canvasCenterX && (charCenterX - this.cameraSpeedX) < this.level.level_end_x - canvasCenterX) {
            if (this.level.character.isMovingRight() && this.level.character.x + this.camera_x >= 120) {
                this.cameraSpeedX -= 3;
            }
            if (this.level.character.isMovingLeft() && (this.level.character.x + this.level.character.width) + this.camera_x <= this.ctx.canvas.width - 240) {
                this.cameraSpeedX += 3;
            }
            this.camera_x = -(charCenterX - canvasCenterX - this.cameraSpeedX);
        }
    }

    /**
     * If horizontal moving character passes one half the canvas at begin,
     *  or has not reached  level end minus one half the canvas,
     *  @this @member camera_x is updated to keep the character in the middle of the screen.
     */
    checkCamera() {
        let charCenterX = this.level.character.x + this.level.character.width * 0.5;
        let canvasCenterX = this.ctx.canvas.width * 0.5;

        if (charCenterX > canvasCenterX && charCenterX < this.level.level_end_x - canvasCenterX) {
            this.camera_x = -(charCenterX - canvasCenterX);
        }
    }

    /**
     * If Character is in Enemy alert Distance range, enemy will be alerted if it can be alerted
     */
    checkAlertEnemies() {
        if (this.level.endBoss.canAlert()
            && this.level.endBoss.distanceFromX(this.level.character) < this.level.endBoss.alertDistance
        ) {
            this.level.endBoss.alert(this.level.character);
        }
    }

    /**
     * Wrapper @function checkCollisions, calls different collision check functions.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index, enemies) => this.checkEnemyCollisions(enemy, index, enemies));
        this.level.endBoss.chickens.forEach((chicken, index, chickens) => this.checkEnemyCollisions(chicken, index, chickens));
        this.checkCollisionsWithCollectibles(this.level.coins);
        this.checkCollisionsWithCollectibles(this.level.bottles);
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
        if (!(this.level.character.isKilled() || enemy.isKilled() || this.level.character.isHit()) && this.level.character.isColliding(enemy)) {
            if (this.level.character.isStamping(enemy)) {
                enemy.hit(); 
                this.level.character.groundPos = this.level.character.y;
                this.level.character.speedY = 0;
                this.level.character.launch();
                if (enemy.isKilled()) {
                    enemy.AUDIOS['STAMP'].play();
                    this.spliceTimeout(collection, enemy);
                }
            } else {
                this.level.character.hit();
            }
        }
    }

    /**
     * @function checkThrowEnemyCollision, checks if player used projectile @param throwObj hits @param enemy from @param collection  
     * @param {ThrowableObject} throwObj - an instanceof of ThrowableObject that the player can use as a projectile to hit enemies 
     * @param {*} enemy - instanceof Enemy to check if is Colliding with @param throwObj
     * @param {*} collection - the Array that holds a reference to @param enemy 
     */
    checkThrowEnemyCollision(throwObj, enemy, collection) {
        if (!(enemy.isKilled() || enemy.isHit()) && throwObj.isAboveGround() && throwObj.isColliding(enemy)) {
            enemy.hit(this.level.character);
           
            if (enemy.isKilled()) {
                enemy.AUDIOS['KILL'].play();
                this.spliceTimeout(collection, enemy);
            }
            throwObj.hit();
            this.spliceTimeout(this.level.character.throwBottles, throwObj);
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
        array.splice(position, 1);
    }

    /**
     * @param {CollectibleObject[]} collectibles 
     */
    checkCollisionsWithCollectibles(collectibles) {
        collectibles.forEach((collectible, index) => {
            if (this.level.character.isColliding(collectible) && this.hasCollect(collectible)) {
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

    drawGameInProgress() {
        // --------- Space for fixed Objects ---------
        this.addToMap(this.level.clearRect);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        // --------- Space for fixed Objects End ---------

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endBoss.chickens);
        this.addObjectsToMap(this.level.character.throwBottles);
        this.addToMap(this.level.endBoss.hitPointsBar);
        this.addToMap(this.level.character);

        this.ctx.translate(-this.camera_x, 0);

        // --------- Space for fixed Objects ---------
        this.addToMap(this.level.character.hitPointsBar);
        this.addToMap(this.level.character.coinsBar);
        this.addToMap(this.level.character.bottlesBar);
        // --------- Space for fixed Objects End ---------
    }

    isGameOver() {
        return this.level.character.isKilled() || this.level.endBoss.isKilled();
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
     * Draws the @param mo on @this @member ctx and performs after and before conditional changes, like flip image or context translations.
     * Each before draw change in @this @member ctx should be reversed apply after draw.
     * @param {DrawableObject} mo 
     */
    addToMap(mo) {
        if (this.insideCanvas(mo)) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            if (mo instanceof BackgroundObject) {
                this.ctx.translate(this.camera_x * mo.distance, 0);
            }
            mo.draw(this.ctx);
            mo.drawFrames(this.ctx);
            if (mo instanceof BackgroundObject) {
                this.ctx.translate(-this.camera_x * mo.distance, 0);
            }
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
        }
    }

    flipImage(mo) {
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    insideCanvas(mo) {
        //Only for Objects translate by Camera Movement
        //Character, level clear Rect Background and all others pointed above
        return true;
        return mo.x + mo.width + this.camera_x > 0 && mo.x + this.camera_x < 720;
    }

    /**
     * Help @function muteSounds to stop loop audios from playing
     */
    muteSounds() {
        this.level.muteSounds();
    }

    /**
     * Help @function muteSounds to start loop audios to play
     */
    unmuteSounds() {
        this.level.unmuteSounds();
    }
}