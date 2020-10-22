class objectClass{
    constructor(isPlayer, radius){
        this.isPlayerBool = isPlayer;
        this.radius = radius;
    }

    set setIsPlayer(isPlayer){
        this.isPlayer = isPlayer;
    }

    get isPlayer(){
        return this.isPlayerBool;
    }

    set setRadius(newRadius){
        this.radius = newRadius;
    }

    get getRadius(){
        return this.radius;
    }
}