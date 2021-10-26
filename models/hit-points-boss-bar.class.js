class HitPointsBossBar extends StatusBar {
    IMAGES = [
        'img/7.Marcadores/Barra/Marcador vida/Naranja/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/Najanja/20__1.png',
        'img/7.Marcadores/Barra/Marcador vida/Najanja/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/Najanja/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/Najanja/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/Najanja/100_.png'
    ];
    
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        super.loadImages(this.IMAGES);
        super.setPercentage(100);
    }
}