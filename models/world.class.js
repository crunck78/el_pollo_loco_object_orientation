class World {
    requestDraw;
    drawTime;
    requestCheckWorld;
    checkWorldTime;
    camera_x = 0;
    constructor() {
        this.level = getLevel1();
        this.ctx = document.getElementById('canvas').getContext('2d');
    }

    run() {
        this.level.animateAll();
        this.startCheck();
        this.startDraw();
    }

    stop() {
        this.level.stopAnimateAll();
        this.stopCheck();
        this.stopDraw();
    }

    startCheck() {
        this.requestCheckWorld = requestAnimationFrame(this.check.bind(this));
    }

    stopCheck() {
        cancelAnimationFrame(this.requestCheckWorld);
    }

    startDraw() {
        this.requestDraw = requestAnimationFrame(this.draw.bind(this));
    }

    stopDraw() {
        cancelAnimationFrame(this.requestDraw);
    }

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

    checkWorld(timeStamp) {
        // console.log(elapse);
        this.checkCamera();
        this.checkAlertEnemies();
        this.checkCollisions();
    }

    checkCamera() {
        if (this.level.character.x + this.level.character.width * 0.5 > this.ctx.canvas.width * 0.5 && this.level.character.x + this.level.character.width * 0.5 < this.level.level_end_x - this.ctx.canvas.width * 0.5) {
            this.camera_x = -(this.level.character.x + this.level.character.width * 0.5 - this.ctx.canvas.width * 0.5);
        }
    }

    checkAlertEnemies() {
        if (this.level.endBoss.distanceFromX(this.level.character) < this.level.endBoss.alertDistance
            && !(this.level.endBoss.isAlert() || this.level.endBoss.isAttacking())) {
            this.level.endBoss.alert();
        }
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
                    enemy.AUDIOS['STAMP'].play();
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
                enemy.AUDIOS['KILL'].play();
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
        this.level.character.AUDIOS['COIN'].play();
        this.level.character.coins += 5;
        this.level.character.coinsBar.setPercentage(this.level.character.coins);
    }

    collectBottle() {
        this.level.character.AUDIOS['BOTTLE'].play();
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
        // --------- Space for fixed Objects End ---------

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
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
                this.ctx.translate(this.camera_x * mo.distance, 0);
            }
            mo.draw(this.ctx);
            mo.drawFrames(this.ctx);
            if (mo instanceof BackgroundObject) {
                this.ctx.translate(-this.camera_x * mo.distance, 0);
            }
            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
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