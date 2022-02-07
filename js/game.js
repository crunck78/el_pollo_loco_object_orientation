let world;
const FRAMES_TIME = 16;
const GROUND = 410;

function init(){
    world = new World();
}

function togglePlay(icon, btnHTML){
    btnHTML.blur();
    if(icon.innerText == 'play_circle'){
        icon.innerText = 'pause';
        world.run();
        world.ctx.canvas.classList.remove("d-none");
    }else if(icon.innerText == 'pause'){
        icon.innerText = 'play_circle';
        world.stop();
    }
}

function toggleSounds(icon, btnHTML){
    btnHTML.blur();
    if(icon.innerText == 'volume_off'){
        icon.innerText = 'volume_up';
        world.muteSounds();
    }else if(icon.innerText == 'volume_up'){
        icon.innerText = 'volume_off';
        world.unmuteSounds();
    }
}

function toggleHUD(icon, btnHTML){
    btnHTML.blur();
    if(icon.innerText == 'visibility_off'){
        icon.innerText = 'visibility';
        //document.getElementById('hud').style.visibility = "hidden";
    }else if(icon.innerText == 'visibility'){
        icon.innerText = 'visibility_off';
        //document.getElementById('hud').style.visibility = "visible";
    }
}