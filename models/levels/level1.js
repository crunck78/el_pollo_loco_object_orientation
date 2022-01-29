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
    let collection1 = getChickensCollection(400);
    let collection2 = getChickensCollection(800);
    let collection3 = getChickensCollection(1200);
    let collection4 = getChickensCollection(1600);
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

function getLevelClouds() {
    return [
        new Cloud(300, 200),
        new Cloud(800, 400)
    ];
}

function getLevelBackgrounds() {
    let collection1 = getBackgroundsCollection(-1, 1);
    let collection2 = getBackgroundsCollection(0, 2);
    let collection3 = getBackgroundsCollection(1, 1);
    let collection4 = getBackgroundsCollection(2, 2);
    let collection5 = getBackgroundsCollection(3, 1);

    return collection1.concat(collection2, collection3, collection4, collection5);
}

function getBackgroundsCollection(xPos, section) {
    return [
        new BackgroundObject(`img/5.Fondo/Capas/3.Fondo3/${section}.png`, CANVAS_WIDTH * xPos, 0.5),
        new BackgroundObject(`img/5.Fondo/Capas/2.Fondo2/${section}.png`, CANVAS_WIDTH * xPos, 0.7),
        new BackgroundObject(`img/5.Fondo/Capas/1.suelo-fondo1/${section}.png`, CANVAS_WIDTH * xPos)
    ];
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
    let collection1 = getBottlesCollection(100);
    let collection2 = getBottlesCollection(400);
    let collection3 = getBottlesCollection(600);
    let collection4 = getBottlesCollection(1000);
    return collection1.concat(collection2, collection3, collection4);
}

function getBottlesCollection(xPos) {
    return [
        new Bottle(xPos * 0 + 100, 0),
        new Bottle(xPos * 1 + 100, 0),
        new Bottle(xPos * 2 + 100, 0),
        new Bottle(xPos * 3 + 100, 0),
        new Bottle(xPos * 4 + 100, 0),
        new Bottle(xPos * 5 + 100, 0),
        new Bottle(xPos * 6 + 100, 0)
    ];
}