/**
 *
 * @returns {Level}
 */
function getLevel1() {
  return new Level(
    getLevelChickens(),
    getLevelClouds(),
    getLevelBackgrounds(),
    getLevelCoins(),
    getLevelBottles(),
    getLevelPlatforms()
  );
}

/**
 *
 * @returns {Platform[]}
 */
function getLevelPlatforms() {
  // return [];
  let collection1 = getPlatformCollection(300);
  let collection2 = getPlatformCollection(2000);
  let collection3 = [new Platform(1450, 100)];
  return collection1.concat(collection2, collection3);
}

/**
 *
 * @param {number} firstX
 * @returns {Platform[]}
 */
function getPlatformCollection(firstX) {
  return [
    new Platform(firstX + 0 * 300),
    new Platform(firstX + 1 * 300, 100),
    new Platform(firstX + 2 * 300),
  ];
}

/**
 *
 * @returns {Chicken[]}
 */
function getLevelChickens() {
  return [];
  let collection1 = getChickensCollection(400);
  let collection2 = getChickensCollection(800);
  let collection3 = getChickensCollection(1200);
  let collection4 = getChickensCollection(1600);
  return collection1.concat(collection2, collection3, collection4);
}

/**
 *
 * @param {number} firstX
 * @returns {Chicken[]}
 */
function getChickensCollection(firstX) {
  return [
    new Chicken(firstX + 0 * 100, 0),
    new Chicken(firstX + 1 * 100, 0),
    new Chicken(firstX + 2 * 100, 0),
    new Chicken(firstX + 3 * 100, 0),
    new Chicken(firstX + 4 * 100, 0),
  ];
}

/**
 *
 * @returns {Cloud[]}
 */
function getLevelClouds() {
  return [new Cloud(300, 200), new Cloud(800, 400)];
}

/**
 *
 * @returns {BackgroundObject[]}
 */
function getLevelBackgrounds() {
  let collection1 = getBackgroundsCollection(-1, 1);
  let collection2 = getBackgroundsCollection(0, 2);
  let collection3 = getBackgroundsCollection(1, 1);
  let collection4 = getBackgroundsCollection(2, 2);
  let collection5 = getBackgroundsCollection(3, 1);

  return collection1.concat(collection2, collection3, collection4, collection5);
}

/**
 *
 * @param {number} xPos
 * @param {string} section
 * @returns @returns {BackgroundObject[]}
 */
function getBackgroundsCollection(xPos, section) {
  return [
    new BackgroundObject(
      `img/5.Fondo/Capas/3.Fondo3/${section}.png`,
      CANVAS_WIDTH * xPos,
      0.5
    ),
    new BackgroundObject(
      `img/5.Fondo/Capas/2.Fondo2/${section}.png`,
      CANVAS_WIDTH * xPos,
      0.7
    ),
    new BackgroundObject(
      `img/5.Fondo/Capas/1.suelo-fondo1/${section}.png`,
      CANVAS_WIDTH * xPos
    ),
  ];
}

/**
 *
 * @returns { Coin[] }
 */
function getLevelCoins() {
  //return [new Coin(1200, 100)];
  let collection1 = getCoinsCollection(300, 200);
  let collection2 = getCoinsCollection(900, 200);
  let collection3 = getCoinsCollection(2000, 200);
  let collection4 = getCoinsCollection(2600, 200);
  return collection1.concat(collection2, collection3, collection4);
}

/**
 *
 * @param {number} firstX
 * @param {number} firstY
 * @returns { Coin[] }
 */
function getCoinsCollection(firstX, firstY) {
  return [
    new Coin(firstX + 0 * 50, firstY - 0 * 50),
    new Coin(firstX + 1 * 50, firstY - 1 * 50),
    new Coin(firstX + 2 * 50, firstY - 2 * 50),
    new Coin(firstX + 3 * 50, firstY - 1 * 50),
    new Coin(firstX + 4 * 50, firstY - 0 * 50),
  ];
}

/**
 *
 * @returns {Bottle[]}
 */
function getLevelBottles() {
  //return [];
  let collection1 = getBottlesCollection(580, -200, 20);
  let collection2 = getBottlesCollection(2280, -200, 20);
  let collection3 = getBottlesCollection(1430, -200, 20);
  let collection4 = getBottlesCollection(1430, -200);

  // let collection5 = getBottlesCollection(200);
  // let collection6 = getBottlesCollection(300);
  // let collection7 = getBottlesCollection(700);
  // let collection8 = getBottlesCollection(900);

  return collection1.concat(
    collection2,
    collection3,
    collection4
    // collection5,
    // collection6,
    // collection7,
    // collection8
  );
}

/**
 *
 * @param {number} xPos
 * @returns {Bottle[]}
 */
function getBottlesCollection(xPos, yPos, groundPos) {
  return [
    new Bottle(xPos + 60 * 0, yPos, groundPos),
    new Bottle(xPos + 60 * 1, yPos, groundPos),
    new Bottle(xPos + 60 * 2, yPos, groundPos),
    new Bottle(xPos + 60 * 3, yPos, groundPos),
    new Bottle(xPos + 60 * 4, yPos, groundPos),
    // new Bottle(xPos + 50 * 5, yPos, groundPos),
    // new Bottle(xPos + 50 * 6, yPos, groundPos)
  ];
}
