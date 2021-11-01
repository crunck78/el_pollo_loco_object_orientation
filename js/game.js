let world;
const FRAMES_TIME = 16;

function init(){
    World.ctx =  document.getElementById('canvas').getContext('2d');
    world = new World();
}