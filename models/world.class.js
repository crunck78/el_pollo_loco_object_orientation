class World {
    ctx;
    requestDraw;
    drawTime;
    requestCheckWorld;
    checkWorldTime;
    static ctx;
    constructor() {
        this.level = getLevel1();
        this.run();
        this.camera_x = 0;
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
            this.checkCollisions();
        }
        this.requestCheckWorld = requestAnimationFrame(this.checkWorld.bind(this));
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
            } else {
                this.level.character.hit();
            }
        }
    }

    checkThrowEnemyCollision(throwObj, enemy) {
        if (!(enemy.isKilled() || enemy.isHit()) && throwObj.isAboveGround() && throwObj.isColliding(enemy)) {
            enemy.hit();
            throwObj.hit();
        }
    }

    splice(mo) {
        setTimeout(this.delete.bind(this, mo), 2000);
    }

    delete(mo) {
        let position = this.worldObjects.indexOf(mo);
        this.worldObjects.splice(position, 1);
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
        this.level.character.coins += 20;
        this.level.character.coinsBar.setPercentage(this.level.character.coins);
    }

    collectBottle() {
        this.level.character.bottles += 20;
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

        this.addObjectsToMap(this.level.character.throwBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        // TODO FIX IF BOSS GETS DELETED
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
}