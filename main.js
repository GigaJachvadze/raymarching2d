let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let width;
let height;

let updatePerSec = 120;

let moveSpeed = 10;
let rotation = 90;
let rotationSpeed = 5;

let beamDistance = 5;

let objNum = 5;
let objRadius = 10;

let object;
let allObjects = [];

let playerVector;

function main(){
    width = canvas.width;
    height = canvas.height;

    playerVector = new vector(width / 2 + objRadius, height / 2 + objRadius);

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
        let objPos = new vector(randomRange(0, width - objRadius), randomRange(0, height - objRadius));
        let distance = getDistance(objPos);
        newObj = {obj: new objectClass(false, objRadius), vec: objPos, distanceFromPlayer: distance};
        allObjects.push(newObj);
    }

    logInfo();
}

function update(){
    setInterval(r => {
        updateDistance();
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
    let lowestDist = Number.MAX_SAFE_INTEGER;
    let objlowest;
    for (let i = 0; i < allObjects.length; i++) {
        if(allObjects[i].distanceFromPlayer < lowestDist){
            lowestDist = allObjects[i].distanceFromPlayer;
            objlowest = allObjects[i];
        }
    }

    for (let i = 0; i < allObjects.length; i++) {
        if(!allObjects[i].obj.isPlayer){
            let vec = allObjects[i].vec.position;
            let radius = allObjects[i].obj.getRadius;
            ctx.beginPath();
            ctx.fillRect(vec.x - (radius / 2), vec.y - (radius / 2), radius, radius);
            ctx.stroke();
        }
        else{
            let vec = allObjects[i].vec.position;
            let radius = allObjects[i].obj.getRadius;
            let r = allObjects[i].vec.R(rotation, lowestDist)
            ctx.beginPath();
            ctx.arc(vec.x, vec.y, radius, 0, 2 * Math.PI);
            ctx.moveTo(vec.x, vec.y);
            ctx.lineTo(r.x, r.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(vec.x, vec.y, lowestDist, 0, 2 * Math.PI);
            ctx.moveTo(vec.x, vec.y);
            ctx.lineTo(objlowest.vec.position.x, objlowest.vec.position.y);
            ctx.stroke();
        }
    }
    console.log(lowestDist);
}

function checkForInput() {
    document.addEventListener('keydown', (key) => {
        if(key.key === 'w' || key.key === 'W'){
            move('UP');
        }
        if(key.key === 's' || key.key === 'S'){
            move('DOWN');
        }
        if(key.key === 'd' || key.key === 'D'){
            move('RIGHT');
        }
        if(key.key === 'a' || key.key === 'A'){
            move('LEFT');
        }
        if(key.key === 'ArrowRight'){
            move('ROTR');
        }
        if(key.key === 'ArrowLeft'){
            move('ROTL');
        }
    });
}

function move(direction) {
    let oldVec = playerVector;

    if(direction === 'UP'){
        oldVec.move = {newX: oldVec.position.x, newY: oldVec.position.y -= moveSpeed};
    }
    if(direction === 'DOWN'){
        oldVec.move = {newX: oldVec.position.x, newY: oldVec.position.y += moveSpeed};
    }
    if(direction === 'RIGHT'){
        oldVec.move = {newX: oldVec.position.x += moveSpeed, newY: oldVec.position.y};
    }
    if(direction === 'LEFT'){
        oldVec.move = {newX: oldVec.position.x -= moveSpeed, newY: oldVec.position.y};
    }
    if(direction === 'ROTR'){
        rotation -= rotationSpeed;
    }
    if(direction === 'ROTL'){
        rotation += rotationSpeed;
    }
}

function getDistance(vector){
    let p = playerVector;

    let dx = Math.max((vector.position.x - objRadius / 2) - p.position.x, 0, p.position.x - (vector.position.x + objRadius / 2));
    let dy = Math.max((vector.position.y - objRadius / 2) - p.position.y, 0, p.position.y - (vector.position.y + objRadius / 2)); 

    return Math.sqrt(dx*dx + dy*dy);
}

function updateDistance(){

    for (let i = 0; i < allObjects.length; i++) {
        if(!allObjects[i].obj.isPlayer){
            allObjects[i].distanceFromPlayer = getDistance(allObjects[i].vec);
        }
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