class StatusBar extends DrawableObject {
    percentage = 100;
    x = 0;
    y = 0;
    width = 200;
    height = 60;
   
    // setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // -> 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}