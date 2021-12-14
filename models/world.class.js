class World {
    requestDraw;
    drawTime;
    requestCheckWorld;
    checkWorldTime;
    camera_x = 0;
    static ctx;
    constructor() {
        this.level = getLevel1();
    }

    run() {
        this.level.animateAll();
        this.startCheckWorld();
        this.startDraw();
    }

    stop() {
        this.level.stopAnimateAll();
        this.stopCheckWorld();
        this.stopDraw();
    }

    startCheckWorld() {
        this.requestCheckWorld = requestAnimationFrame(this.checkWorld.bind(this));
    }

    stopCheckWorld() {
        cancelAnimationFrame(this.requestCheckWorld);
    }

    startDraw() {
        this.requestDraw = requestAnimationFrame(this.draw.bind(this));
    }

    stopDraw() {
        cancelAnimationFrame(this.requestDraw);
    }

    checkWorld(timeStamp) {
        if (this.checkWorldTime === undefined) {
            this.checkWorldTime = timeStamp
        }
        const elapse = timeStamp - this.checkWorldTime;
        if (elapse > FRAMES_TIME) {
            this.checkWorldTime = timeStamp;
            
            this.camera_x = -this.level.character.x + 120;
            this.checkAlertEnemies();
            this.checkCollisions();
        }
        this.requestCheckWorld = requestAnimationFrame(this.checkWorld.bind(this));
    }

    checkAlertEnemies() {
       this.level.endBoss.alert(this.level.character);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => this.checkEnemyCollisions(enemy));
        this.checkCollisionsWihtCollectibles(this.level.coins);
        this.checkCollisionsWihtCollectibles(this.level.bottles);
    }

    checkEnemyCollisions(enemy) {
        this.checkEnemyCharacterCollision(enemy);
        this.level.character.throwBottles.forEach(throwObj => this.checkThrowEnemyCollision(throwObj, enemy));
    }

    checkEnemyCharacterCollision(enemy) {
        if (!(this.level.character.isKilled() || enemy.isKilled() || this.level.character.isHit()) && this.level.character.isColliding(enemy)) {
            if (this.level.character.isStamping(enemy)) {
                enemy.hit();
                //TODO: create a interval setter for groundPos that sets the ground position 
                this.level.character.groundPos = this.level.character.y - 50;
                this.level.character.speedY = 0;
                this.level.character.launch();
                if (enemy.isKilled()) {
                    enemy.AUDIOS['stamp'].play();
                    this.splice(this.level.enemies, enemy);
                }
            } else {
                this.level.character.hit();
            }
        }
    }

    checkThrowEnemyCollision(throwObj, enemy) {
        if (!(enemy.isKilled() || enemy.isHit()) && throwObj.isAboveGround() && throwObj.isColliding(enemy)) {
            enemy.hit();
            if (enemy.isKilled()) {
                enemy.AUDIOS['kill'].play();
                this.splice(this.level.enemies, enemy);
            }
            throwObj.hit();
            this.splice(this.level.character.throwBottles, throwObj);
        }
    }

    splice(array, mo) {
        setTimeout(this.delete.bind(this, array, mo), 2000);
    }

    delete(array, mo) {
        let position = array.indexOf(mo);
        array.splice(position, 1);
    }

    checkCollisionsWihtCollectibles(collectibles) {
        collectibles.forEach((collectible, index) => {
            if (this.level.character.isColliding(collectible) && this.hasCollect(collectible)) {
                collectibles.splice(index, 1);
            }
        });
    }

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

    collectCoin() {
        this.level.character.AUDIOS["coin"].play();
        this.level.character.coins += 5;
        this.level.character.coinsBar.setPercentage(this.level.character.coins);
    }

    collectBottle() {
        this.level.character.AUDIOS["bottle"].play();
        this.level.character.bottles += 5;
        this.level.character.bottlesBar.setPercentage(this.level.character.bottles);
    }

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
        // --------- Space for fixed Objects ---------

        World.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.character.throwBottles);
        this.addToMap(this.level.endBoss.hitPointsBar);
        this.addToMap(this.level.character);

        World.ctx.translate(-this.camera_x, 0);

        // --------- Space for fixed Objects ---------
        this.addToMap(this.level.character.hitPointsBar);
        this.addToMap(this.level.character.coinsBar);
        this.addToMap(this.level.character.bottlesBar);
        // --------- Space for fixed Objects End ---------
    }

    isGameOver() {
        return this.level.character.isKilled() || this.level.endBoss.isKilled();
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (this.insideCanvas(mo)) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            if (mo instanceof BackgroundObject) {
                World.ctx.translate(this.camera_x * mo.distance, 0);
            }
            mo.draw(World.ctx);
            mo.drawFrame(World.ctx);
            if (mo instanceof BackgroundObject) {
                World.ctx.translate(-this.camera_x * mo.distance, 0);
            }
            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    flipImage(mo) {
        World.ctx.save();
        World.ctx.translate(mo.width, 0);
        World.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        World.ctx.restore();
    }

    insideCanvas(mo) {
        //Only for Objects translatet by Camera Movement
        //TODO
        return true;
        return mo.x + mo.width + this.camera_x > 0 && mo.x + this.camera_x < 720;
    }

    muteSounds() {
        this.level.muteSounds();
    }

    unmuteSounds() {
        this.level.unmuteSounds();
    }
}