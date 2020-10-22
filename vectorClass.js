class vector{
    constructor(x, y){
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

    R(angle){
        let maxDistance = 50;

        let xcos = this.x * Math.cos(angle);
        let xsin = this.x * Math.sin(angle);
        let ycos = this.y * Math.cos(angle);
        let ysin = this.y * Math.sin(angle);

        console.log(xcos);
        console.log(xsin);
        console.log(ycos);
        console.log(ysin);

        let rotationCords = {x: (xcos - ysin) * 1, y: (xsin + ycos) * 1};
        return rotationCords;
    }
}