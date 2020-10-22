class vector{
    constructor(x, y, cWidth, cHeight){
        this.x = x;
        this.y = y;
    }

    set move({newX, newY}){
        this.x = newX;
        this.y = newY;
    }

    get position(){
        return {x: this.x, y: this.y};
    }
}