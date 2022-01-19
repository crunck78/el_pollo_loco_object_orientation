function getLevel1() {
    return new Level(
        getLevelChickens(),
        getLevelClouds(),
        getLevelBackgrounds(),
        getLevelCoins(),
        getLevelBottles(),
    );
}

function getLevelChickens() {
    return [];
    let collection1 = getChickensCollection(100);
    let collection2 = getChickensCollection(400);
    let collection3 = getChickensCollection(600);
    let collection4 = getChickensCollection(1000);
    return collection1.concat(collection2, collection3, collection4);
}

function getChickensCollection(firstX) {
    return [
        new Chicken(firstX + 0 * 100),
        new Chicken(firstX + 1 * 100),
        new Chicken(firstX + 2 * 100),
        new Chicken(firstX + 3 * 100),
        new Chicken(firstX + 4 * 100)
    ];
}

function getLevelClouds(){
    return [
        new Cloud(300, 200),
        new Cloud(800, 400)
    ];
}

function getLevelBackgrounds(){
    return [

        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -720, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -720, 0.7),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -720),
        
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0, 0.7),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),

        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720, 0.7),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720),
        
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 720 * 2, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 720 * 2, 0.7),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 720 * 2),

        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720 * 3, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720 * 3, 0.7),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720 * 3),
    ]
}

function getLevelCoins() {
    let collection1 = getCoinsCollection(500, 200);
    let collection2 = getCoinsCollection(1000, 200);
    let collection3 = getCoinsCollection(1500, 200);
    let collection4 = getCoinsCollection(2000, 200);
    return collection1.concat(collection2, collection3, collection4);
}

function getCoinsCollection(firstX, firstY) {
    return [
        new Coin(firstX + 0 * 100, firstY - 0 * 50),
        new Coin(firstX + 1 * 100, firstY - 1 * 50),
        new Coin(firstX + 2 * 100, firstY - 2 * 50),
        new Coin(firstX + 3 * 100, firstY - 1 * 50),
        new Coin(firstX + 4 * 100, firstY - 0 * 50)
    ];
}

function getLevelBottles() {
    return [
        new Bottle(400, 0),
        new Bottle(300, 0),
        new Bottle(500, 0),
        new Bottle(600, 0),
        new Bottle(700, 0),
        new Bottle(800, 0),
        new Bottle(900, 0),
        new Bottle(1100, 0),
        new Bottle(1200, 0),
        new Bottle(1300, 0),
        new Bottle(1000, 0),
        new Bottle(1400, 0),
        new Bottle(1500, 0),
        new Bottle(1600, 0),
        new Bottle(1700, 0),
        new Bottle(1800, 0),
        new Bottle(1900, 0),
        new Bottle(2000, 0),
        new Bottle(2100, 0),
        new Bottle(2200, 0),
        new Bottle(2300, 0),
        new Bottle(2400, 0),
        new Bottle(2500, 0),
        new Bottle(2600, 0),
        new Bottle(2700, 0),
        new Bottle(2800, 0),
        new Bottle(2900, 0)
    ];
}