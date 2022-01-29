let world;
const FRAMES_TIME = 16;
const GROUND = 410;

function init(){
    world = new World();
}

function muteSounds(){
    world.muteSounds();
}

function unmuteSounds(){
    world.unmuteSounds();
}

function runGame(){
    world.run();
    world.ctx.canvas.classList.remove("d-none");
    //document.getElementById("hud").classList.add("d-none");
}

function stopGame(){
    world.stop();
}