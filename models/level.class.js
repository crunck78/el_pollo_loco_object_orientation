class Level{
    static level_end_x = 2200;
    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.character = new Character();
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endBoss = this.enemies.find(enemy => enemy instanceof EndBoss);
        this.clearRect = new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0, 0);
        // World.allObject = [
        //     ...this.enemies,
        //     ...this.clouds, 
        //     ...this.backgroundObjects, 
        //     ...this.coins, 
        //     ...this.bottles,
        //     ...[this.character, this.clearRect]
        // ];
        // World.collisionObjects = [
        //     ...this.enemies,
        //     ...this.coins,
        //     ...this.bottles,
        //     ...World.throwableObjects,
        // ].push(this.character);
    }

    animateAll(){
        this.character.animate();
        this.animateCollection(this.enemies);
        this.animateCollection(this.coins);
        this.animateCollection(this.bottles);
        this.animateCollection(this.clouds);
    }

    animateCollection(array){
        array.forEach(element => {
            element.animate();
        });
    }

    stopAnimateAll(){
        this.character.stopAnimate();
        this.stopAnimateCollection(this.enemies);
        this.stopAnimateCollection(this.coins);
        this.stopAnimateCollection(this.bottles);
        this.stopAnimateCollection(this.clouds);
    }

    stopAnimateCollection(array){
        array.forEach(element => {
            element.stopAnimate();
        });
    }
}