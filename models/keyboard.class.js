class Keyboard{
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    THROW_REQUEST_STOP = new Date().getTime();
    THROW_REQUEST_START = 0;

    constructor(){
        window.addEventListener('keydown', (e)=>{
            if(e.keyCode == 39){
                this.RIGHT = true;
            }
            if(e.keyCode == 37){
                this.LEFT = true;
            }
            if(e.keyCode == 38){
                this.UP = true;
            }
            if(e.keyCode == 40){
                this.DOWN = true;
            }
            if(e.keyCode == 32){
                this.SPACE = true;
            }
            if(e.keyCode == 68){
                // if(this.THROW_REQUEST_STOP > this.THROW_REQUEST_START && !this.D){
                //     this.THROW_REQUEST_START = new Date().getTime();
                    this.D = true;
                //}
            }
        });
        
        window.addEventListener('keyup', (e)=>{
            if(e.keyCode == 39){
                this.RIGHT = false;
            }
        
            if(e.keyCode == 37){
                this.LEFT = false;
            }
        
            if(e.keyCode == 38){
                this.UP = false;
            }
        
            if(e.keyCode == 40){
                this.DOWN = false;
            }
        
            if(e.keyCode == 32){
                this.SPACE = false;
            }
        
            if(e.keyCode == 68){
                this.D = false;
                //this.THROW_REQUEST_STOP = new Date().getTime();
            }
        });
    }

    
}