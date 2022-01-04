class Level {
    level_end_x = 720 * 4;
    AUDIOS = LEVEL_ASSETS['AUDIOS'];
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.character = new Character();
        this.endBoss = new EndBoss();
        this.enemies = enemies;
        this.enemies.push(this.endBoss);
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
       
        
        this.clearRect = new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0, 0);
        this.allObjects = this.getAllObjects();
        // World.collisionObjects = [
        //     ...this.enemies,
        //     ...this.coins,
        //     ...this.bottles,
        //     ...World.throwableObjects,
        // ].push(this.character);
        
        
    }

    animateAll() {
        this.AUDIOS['BACKGROUND'].play();
        this.character.animate();
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

    stopAnimateAll() {
        this.AUDIOS['BACKGROUND'].pause();
        this.character.stopAnimate();
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

    getAllObjects(){
        return[
            ...this.enemies,
            ...this.clouds,
            ...this.backgroundObjects,
            ...this.coins,
            ...this.bottles,
            ...[this.character, this.clearRect]
        ];
    }

    muteSounds(){
        this.AUDIOS['BACKGROUND'].volume = 0;
    }

    unmuteSounds(){
        this.AUDIOS['BACKGROUND'].volume = 100;
    }

}