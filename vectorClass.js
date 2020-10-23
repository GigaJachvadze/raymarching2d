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

    R(angle, distance){
        let radian = (Math.PI / 180) * (angle - 45);

        let cos = Math.cos(radian);
        let sin = Math.sin(radian);

        if(!distance){
            distance = 10;
        }

        let cx = this.x + distance;
        let cy = this.y + distance;

        let rotationCords = {
            x: ((cos * (cx - this.x)) + (sin * (cy - this.y)) + this.x), 
            y: ((cos * (cy - this.y)) - (sin * (cx - this.x)) + this.y)
        };

        this.cx = rotationCords.x;
        this.cy = rotationCords.y;

        return rotationCords;
    }
}