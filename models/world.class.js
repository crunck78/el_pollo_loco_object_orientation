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
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        requestAnimationFrame(this.checkWorld.bind(this));
        requestAnimationFrame(this.draw.bind(this));
    }

    checkWorld() {
        this.checkThrowObjects();
        this.checkCollisions();
        requestAnimationFrame(this.checkWorld.bind(this));
    }

    checkThrowObjects() {
        if (this.canThrow()) {
           this.throwObj();
        }
    }

    throwObj(){
        this.keyboard.THROW_REQUEST_STOP = new Date().getTime();
        let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }

    canThrow() {
        return this.keyboard.D &&
            this.keyboard.THROW_REQUEST_START > this.keyboard.THROW_REQUEST_STOP;
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
            throwObj.break();
            setTimeout(this.deleteEnemy.bind(this, enemy), 2000);
            setTimeout(this.deleteThrow.bind(this, throwObj), 2000);
        }
    }

    deleteThrow(to) {
        let position = this.throwableObjects.indexOf(to);
        this.throwableObjects.splice(position, 1);
    }

    deleteEnemy(enemy) {
        let position = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(position, 1);
    }

    checkEnemyCharacterCollision(enemy) {
        if (!this.character.isDead() && !enemy.isDead() && this.character.isColliding(enemy) && !this.character.isHurt()) {
            console.log("HIT");
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

    draw() {

        this.addToMap(this.clearRect);
        this.addObjectsToMap(this.level.backgroundObjects);
        // --------- Space for fixed Objects ---------
        this.addObjectsToMap(this.level.clouds);
        // --------- Space for fixed Objects ---------

        this.ctx.translate(this.camera_x, 0);

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