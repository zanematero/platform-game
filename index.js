// Ability to reset
var button = document.getElementById('refreshButton');
body.onload = function() {
    console.log('DOM loaded')
    button.onclick = function() {
        window.location.reload()
        console.log('Page reloaded')
    }
}

// Function to add player image
function newPlayer(url){
    let image = document.createElement('img');
    image.src = url;
    image.style.position = 'absolute';
    return image;
};

// Add spike image to canvas
let spikes = [
    {
        x: 10,
        y: 250
    },
    {
        x: 650,
        y: 200
    },
    {
        x: 500,
        y: 165
    }
]
function renderSpike(){
    if(canvas.getContext){
        var img = new Image();
        img.src = "assets/spike.png";
        img.onload = function(){
            for (i = 0; i < spikes.length; i++) {
                ctx.drawImage(img, spikes[i].x, spikes[i].y);
            }
        }
    }
}

// Add food image to canvas
window.onload = function() {
    document.getElementById("foodCollected").innerHTML = foodCollected;
}
let foodCollected = 0;
var foodsCount = 3;
let foods = [
    {
        x: 250,
        y: 200,
        width: 250,
        height: 250

    },
    {
        x: 750,
        y: 200,
        width: 250,
        height: 250
    },
    {
        x: 100,
        y: 250,
        width: 250,
        height: 250
    }
]
function renderFood(){
    if(canvas.getContext){
        var img = new Image();
        img.src = "assets/turkey.png";
        img.onload = function(){
            for (i = 0; i < foods.length; i++) {
                ctx.drawImage(img, foods[i].x, foods[i].y);
            }
        }
    }
}

// Canvas creation
function createCanvas() {
    ctx.fillStyle = "#f2d0bf";
    ctx.fillRect(0, 0, 1040, 560);
};

cWidth = 1040;
cHeight = 560;
canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.height = cHeight;
ctx.canvas.width = cWidth;

// Set player stats
var playerInfo = {
    x: 75,
    y: 125,
    xVelocity: 0,
    yVelocity: 0,
    jumping: true,
    height: 85,
    width: 85
};

let stanceCurrent = "assets/stand.png"

var animation = {
    jump: "assets/jump.png",
    left: "assets/run_back.png",
    right: "assets/run.png",
    stand: "assets/stand.png"
};

if (playerInfo.xVelocity > -1 && playerInfo.xVelocity < 1) {
    stanceCurrent = animation.stand;
};

// Assigning canvas element for player to detect collision
function createPlayer() {
    ctx.fillStyle = "#F08080";
    img = newPlayer(stanceCurrent);
    ctx.drawImage(img, (playerInfo.x + 35) - playerInfo.width, (playerInfo.y) - playerInfo.height);
};

// Movement
var keysCurrent = {
    right: false,
    left: false,
    jump: false
};

var movementGravity = 0.25;

var movementFriction = 0.0;

function keydown(e) {
    // Left arrow
    if (e.keyCode == 37) {
        keysCurrent.left = true;
        console.log('left')
    }
    // Up arrow
    if (e.keyCode == 38) {
        if (playerInfo.jumping == false) {
            playerInfo.yVelocity = -5;
            console.log('jump')
        }
    }
    // Right arrow
    if (e.keyCode == 39) {
        keysCurrent.right = true;
        console.log('right')
    }
}

function keyup(e){
    if (e.keyCode == 37) {
        keysCurrent.left = false;
        console.log('left')
    }
    if (e.keyCode == 38) {
        if (playerInfo.yVelocity < -1) {
            playerInfo.yVelocity = -3;
            console.log('jump')
        }
    }
    if (e.keyCode == 39) {
        keysCurrent.right = false;
        console.log('right')
    }
};

// Platform creation
var platforms = [];
var platformCount = 5;

function renderPlatform() {
    ctx.fillStyle = "#702963";
    for (i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
};

// Platform location assignment
function createPlatform() {
    for (i = 0; i < platformCount; i++) {
        platforms.push(
            {
                x: 5 * (i * 400),
                y: 200,
                width: 100,
                height: 10
            },
            {
                x: 1.2 * (i + 175),
                y: 250,
                width: 150,
                height: 10
            },
            {
                x: 1.2 * (i + 550),
                y: 250,
                width: 150,
                height: 10
            },
            {
                x: 5 * (i * 325),
                y: 300,
                width: 250,
                height: 10
            },
            {
                x: 2 * (i + 232.5),
                y: 225,
                width: 175,
                height: 10
            },
        );
    };
};

// Logic to check and apply movement/collision
function checkStatus() {
    if (playerInfo.jumping == false) {
        playerInfo.xVelocity *= movementFriction;
    } else {
        playerInfo.yVelocity += movementGravity;
        stanceCurrent = animation.jump;
    }
    playerInfo.jumping = true;

    if (keysCurrent.left) {
        playerInfo.xVelocity = -3;
        stanceCurrent = animation.left;
    }
    if (keysCurrent.right) {
        playerInfo.xVelocity = 3;
        stanceCurrent = animation.right;
    }
    playerInfo.y += playerInfo.yVelocity;
    playerInfo.x += playerInfo.xVelocity;

    let i = -1;
    for (let p = 0; p < platformCount; p++) {
        if (platforms[p].x < playerInfo.x && playerInfo.x < platforms[p].x + platforms[p].width &&
            platforms[p].y < playerInfo.y && playerInfo.y < platforms[p].y + platforms[p].height) {
            i = p;
        }
    }
    if (i > -1) {
        playerInfo.jumping = false;
        playerInfo.y = platforms[i].y;
    }

    // Show stance if player isn't moving
    if (playerInfo.xVelocity > -1 && playerInfo.xVelocity < 1) {
        stanceCurrent = animation.stand;
    }

    console.log(foodCollected)
    createCanvas();
    createPlayer();
    renderPlatform();
    renderSpike();
    renderFood();
}

function checkScore() {
    for (let i = 0; i < foodsCount; i++) {
        if (foods[0].x < playerInfo.x && playerInfo.x < foods[0].x + foods[0].width &&
            foods[0].y < playerInfo.y && playerInfo.y < foods[0].y + foods[0].height) {
                foodCollected += 1
                foodsCount -= 1
            }
        }
    for (let i = 0; i < foodsCount; i++) {
        if (foods[1].x < playerInfo.x && playerInfo.x < foods[1].x + foods[1].width &&
            foods[1].y < playerInfo.y && playerInfo.y < foods[1].y + foods[1].height) {
                foodCollected += 1
                foodsCount -= 1
            }
        }
    for (let i = 0; i < foodsCount; i++) {
        if (foods[2].x < playerInfo.x && playerInfo.x < foods[2].x + foods[2].width &&
            foods[2].y < playerInfo.y && playerInfo.y < foods[2].y + foods[2].height) {
                foodCollected += 1
                foodsCount -= 1
            }
        }
}
createPlatform();
setInterval(checkStatus, 15);
setInterval(checkScore, 25);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

// spike logic

// const spike = 
// if player intersects with element, player is reset

// if user intersects star then remove star and increase score count

// when all star(s) collected
// win event including replay option
// include score and possibly time?

// reset button, resets time, position, health, score, stars
// track time, begins on load
/* addEventListener(onload, () => {
    
}) */