let world;
const FRAMES_TIME = 16;
const GROUND = 410;

function init(){
    world = new World();
}

function muteSounds(){
    world.muteSounds();
}

function runGame(){
    world.run();
}

function stopGame(){
    world.stop();
}