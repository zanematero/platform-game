// Ability to reset
var button = document.getElementById('refreshButton');
window.addEventListener('load', function() {
    console.log('DOM loaded')
    button.onclick = function() {
        window.location.reload()
        console.log('Page reloaded')
    }
})

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
        x: 15,
        y: 240,
        width: 50,
        height: 60
    },
    {
        x: 500,
        y: 175,
        width: 50,
        height: 60
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

// Add food image to canvas and update foodCollected count in html
setInterval(window.onload = function() {
    document.getElementById("foodCollected").innerHTML = foodCollected;
}, 15)
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

// If standing still, stand animation
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
    // Refresh set to 'r'
    if (e.keyCode == 82) {
        window.location.reload()
    }
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
                x: 5 * (i * 315),
                y: 300,
                width: 250,
                height: 10
            },
            {
                x: 2 * (i + 220.5),
                y: 225,
                width: 175,
                height: 10
            },
        );
    };
};

// Play you won tag
function win() {
    var element = document.getElementById("winner");
    element.classList.add("won")
    var element = document.getElementById("winner");
    element.classList.remove("opacity")
    var element = document.getElementById("title");
    element.classList.add("wonTitle")
}

// Logic to check and apply movement on key press and apply collision with platforms
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

    createCanvas();
    createPlayer();
    renderPlatform();
    renderSpike();
    renderFood();
}

// Logic to apply collision with food and spike elements
function checkScore() {
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].x < playerInfo.x && playerInfo.x < foods[i].x + foods[i].width &&
            foods[i].y < playerInfo.y && playerInfo.y < foods[i].y + foods[i].height) {
                foodCollected += 1
                foods.splice(i,1)
            }
    }
    for (let i = 0; i < spikes.length; i++) {
        if (spikes[i].x < playerInfo.x && playerInfo.x < spikes[i].x + spikes[i].width &&
            spikes[i].y < playerInfo.y && playerInfo.y < spikes[i].y + spikes[i].height) {
                window.location.reload()
            }
    }
}
createPlatform();
setInterval(checkStatus, 15);
setInterval(checkScore, 25);
// Win screen
setInterval(
    function() {
if (foodCollected === 3) {
    win()
}}, 1000)
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

// STRETCH GOAL: track time ability to beat previous score, begins on load (stopwatch)
