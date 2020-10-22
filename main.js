let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let width;
let height;

let updatePerSec = 8;

let moveSpeed = 10;

let objNum = 5;
let objRadius = 10;

let object;
let allObjects = [];

let playerVector;

function main(){
    width = canvas.width;
    height = canvas.height;

    playerVector = new vector(0 + objRadius, 0 + objRadius, width, height);

    setUp();
    update();
    checkForInput();
}

function setUp(){
    clearCanvas();

    allObjects.length = 0;
    object = {obj: new objectClass(true, objRadius), vec: playerVector};
    allObjects.push(object);
    for (let i = 0; i < objNum; i++) {
        let newObj = object;
        let objPos = new vector(randomRange(0, width - objRadius), randomRange(0, height - objRadius), width, height);
        newObj = {obj: new objectClass(false, objRadius), vec: objPos};
        allObjects.push(newObj);
    }

    logInfo();
}

function update(){
    setInterval(r => {
        clearCanvas();
        reDraw();

    }, 1000 / updatePerSec);
}

function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
}

function reDraw(){
    //drawing borders
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.stroke();

    //drawing objects
    for (let i = 0; i < allObjects.length; i++) {
        if(!allObjects[i].obj.isPlayer){
            let vec = allObjects[i].vec.position;
            let radius = allObjects[i].obj.getRadius;
            ctx.beginPath();
            ctx.fillRect(vec.x, vec.y, radius, radius);
            ctx.stroke();
        }
        else{
            let vec = allObjects[i].vec.position;
            let radius = allObjects[i].obj.getRadius;
            ctx.beginPath();
            ctx.arc(vec.x, vec.y, radius, 0.75, 2 * Math.PI);
            ctx.stroke();
        }
    }
    logInfo();
}

function checkForInput() {
    document.addEventListener('keydown', (key) => {
        if(key.key === 'w' || key.key === 'W'){
            move('UP');
        }
        else if(key.key === 's' || key.key === 'S'){
            move('DOWN');
        }
        else if(key.key === 'd' || key.key === 'D'){
            move('RIGHT');
        }
        else if(key.key === 'a' || key.key === 'A'){
            move('LEFT');
        }
    });
}

function move(direction) {
    let oldVec = allObjects[0].vec;
    if(direction === 'UP'){
        allObjects[0].vec.move = {newX: oldVec.position.x, newY: oldVec.position.y -= moveSpeed};
    }
    else if(direction === 'DOWN'){
        allObjects[0].vec.move = {newX: oldVec.position.x, newY: oldVec.position.y += moveSpeed};
    }
    else if(direction === 'RIGHT'){
        allObjects[0].vec.move = {newX: oldVec.position.x += moveSpeed, newY: oldVec.position.y};
    }
    else if(direction === 'LEFT'){
        allObjects[0].vec.move = {newX: oldVec.position.x -= moveSpeed, newY: oldVec.position.y};
    }
}

function logInfo(){
    console.log(allObjects);
}

function randomRange(min, max){
    return Math.floor(Math.random() * max) + min;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

window.onload = main();