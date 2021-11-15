function getLevel1(){
    Level.level_end_x = 2200;
    Level.AUDIOS = {
        background: new Audio('audio/background.mp3')
    };
    return new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new EndBoss()
        ],
        [
            new Cloud(300, 200),
            new Cloud(800, 400)
        ],
        [
    
            // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -720),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -720, 0.5),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -720, 0.7),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -720),
    
            // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0, 0.5),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0, 0.7),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
    
            // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 720),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720, 0.5),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720, 0.7),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720),
    
            // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 720 * 2),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 720 * 2, 0.5),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 720 * 2, 0.7),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 720 * 2),
    
            // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 720 * 3),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720 * 3, 0.5),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720 * 3, 0.7),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720 * 3),
        ],
        getLevelCoins(),
        [
            new Bottle(300, 40),
            new Bottle(400, 40),
            new Bottle(500, 40),
            new Bottle(600, 40),
            new Bottle(700, 40),
            new Bottle(800, 40),
            new Bottle(900, 40),
            new Bottle(1000, 40),
            new Bottle(1100, 40),
            new Bottle(1200, 40),
            new Bottle(1300, 40),
            new Bottle(1400, 40),
            new Bottle(1500, 40),
            new Bottle(1600, 40),
            new Bottle(1700, 40),
            new Bottle(1800, 40),
            new Bottle(1900, 40),
            new Bottle(2000, 40),
            new Bottle(2100, 40),
            new Bottle(2200, 40),
            new Bottle(2300, 40),
            new Bottle(2400, 40),
            new Bottle(2500, 40),
            new Bottle(2600, 40),
            new Bottle(2700, 40),
            new Bottle(2800, 40),
            new Bottle(2900, 40)
        ]
    );
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

function getLevelCoins() {
    let collection1 = getCoinsCollection(500, 200);
    let collection2 = getCoinsCollection(1000, 200);
    let collection3 = getCoinsCollection(1500, 200);
    let collection4 = getCoinsCollection(2000, 200);
    return collection1.concat(collection2, collection3, collection4);
}

function getLevelChickens() {
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