class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    level = level1;
    throwableObjects = [];
    character = new Character();
    statusBar = new StatusBar();
    clearRect = new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0, 0);
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(this.checkWorld.bind(this), 60);
    }

    checkWorld() {
        this.checkCollisions();
        this.checkThrowObjects();
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => this.checkEnemyCollisions(enemy));
        this.checkCollisionsWihtCollectibles(this.level.coins);
        //this.checkCollisionsWihtCollectibles(this.bottles);
    }

    checkEnemyCollisions(enemy) {
        this.checkEnemyCharacterCollision(enemy);
        this.throwableObjects.forEach(throwObj => this.checkThrowEnemyCollision(throwObj, enemy));
    }

    checkThrowEnemyCollision(throwObj, enemy) {
        if (!enemy.isDead() && throwObj.isColliding(enemy)) {
            enemy.kill();
            setTimeout(this.deleteEnemy.bind(this, enemy), 2000);
        }
    }

    deleteEnemy(enemy) {
        let position = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(position, 1);
    }

    checkEnemyCharacterCollision(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isHurt()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    checkCollisionsWihtCollectibles(collectibles) {
        collectibles.forEach((collectible, index) => {
            if (this.character.isColliding(collectible)) {
                collectibles.splice(index, 1);
            }
        });
    }
    //Draw() wird immer wieder aufgerufen
    draw() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.clearRect);
        this.addObjectsToMap(this.level.clouds);

        // this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        // this.ctx.translate(-this.camera_x, 0); //Back

        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        // --------- Space for fixed Objects ---------
        this.addToMap(this.statusBar);
        // --------- Space for fixed Objects End ---------

        requestAnimationFrame(this.draw.bind(this));
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
            this.ctx.translate(this.camera_x * mo.distance, 0);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo instanceof BackgroundObject) {
            this.ctx.translate(-this.camera_x * mo.distance, 0);
        }
        if (mo.otherDirection) {
            this.flipImageBack(mo);
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
}