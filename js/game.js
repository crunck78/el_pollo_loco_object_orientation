let world;
const FRAMES_TIME = 16;

function init(){
    World.ctx =  document.getElementById('canvas').getContext('2d');
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