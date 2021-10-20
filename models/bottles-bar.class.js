class BottlesBar extends StatusBar {
    x = 30; 
    y = 80;
    IMAGES = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/azul/100_.png'
    ];
    
    constructor() {
        super();
        super.loadImages(this.IMAGES);
        super.setPercentage(0);
    }
}