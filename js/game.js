let canvas;
let world;
const FRAMES_TIME = 16;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}