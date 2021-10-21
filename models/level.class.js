class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;
    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    animateAll(){
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