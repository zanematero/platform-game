// Ability to reset
/* var button = document.getElementById("button");
button.addEventListener ('DOMContentLoaded', function(){
    function refresh() {
        window.location.reload()
    }
    button.addEventListener('onclick', refresh);
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
}) */

// Function to add player image
function newPlayer(url){
    let image = document.createElement('img');
    image.src = url;
    image.style.position = 'absolute';
    return image;
}

// Function to add reset and score elements
/* function move(url) {
    let image = document.createElement('img');
    image.src = url;
    element.style.position = 'absolute';
    document.body.append(image)
    return image
    
    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
        document.getElementsByTagName('img').style.zIndex = "1";
    }

    return {
        to: moveToCoordinates
    }
} */

/* move(newImage('assets/turkey.png')).to(450, 140)
move(newImage('assets/spike.png')).to(200, 140) */

// Canvas creation
function createCanvas() {
    ctx.fillStyle = "#f2d0bf";
    ctx.fillRect(0, 0, 1040, 560);
}
cWidth = 1040;
cHeight = 560;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = cHeight;
ctx.canvas.width = cWidth;

// Set player stats
var playerInfo = {
    x: 75,
    y: 400,
    xVelocity: 0,
    yVelocity: 0,
    jumping: true,
    height: 85,
    width: 85
};

let stanceCurrent = "assets/stand.png"

var animation = {
    jump: "assets/jump.png",
    leftJump: "assets/jump_back.png",
    left: "assets/run_back.png",
    right: "assets/run.png",
    stand: "assets/stand.png"
}

if (playerInfo.xVelocity > -1 && playerInfo.xVelocity < 1) {
    stanceCurrent = animation.stand;
}

// Assigning canvas element for player to detect collision
function createPlayer() {
    ctx.fillStyle = "#F08080";
    img = newPlayer(stanceCurrent);
    console.log(stanceCurrent)
    ctx.drawImage(img, (playerInfo.x) - playerInfo.width, (playerInfo.y) - playerInfo.height);
}

// Movement
var keysCurrent = {
    right: false,
    left: false,
    jump: false
}

var movementGravity = 0.6;

var movementFriction = 0.7;

function keydown(e) {
    // Left arrow
    if (e.keycode == 37) {
        keysCurrent.left = true;
        console.log('left')
    }
    // Up arrow
    if (e.keycode == 38) {
        if (playerInfo.jump == false) {
            playerInfo.yVelocity = -5;
            console.log('jump')
        }
    }
    // Right arrow
    if (e.keycode == 39) {
        keysCurrent.right = true;
        console.log('right')
    }
}

function keyup(e){
    if (e.keycode == 37) {
        keysCurrent.left = false;
        console.log('left')
    }
    if (e.keycode == 38) {
        if (playerInfo.yVelocity < -1) {
            playerInfo.yVelocity = -3;
            console.log('jump')
        }
    }
    if (e.keycode == 39) {
        keysCurrent.right = false;
        console.log('right')
    }
}

// Platform creation
var platforms = []
var platformCount = 4;
function renderPlatform() {
    ctx.fillStyle = "#45597E";
    for (i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

// Platform location assignment
function createPlatform() {
    for (i = 0; i < platformCount; i++) {
        // Row 1
        platforms.push(
            {
                x: 2.5 * (i * 100),
                y: 275,
                width: 100,
                height: 10
            }
        );
        // Row 2
        platforms.push(
            {
                x: 2.5 * (i * 100),
                y: 450,
                width: 100,
                height: 10
            }
        );
        // Row 3
        platforms.push(
            {
                x: 2.5 * (i * 100),
                y: 100,
                width: 100,
                height: 10
            }
        );
    }
}

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
        playerInfo.xVelocity = -5;
        stanceCurrent = animation.left;
    }
    if (keysCurrent.right) {
        playerInfo.xVelocity = 5;
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
}
createPlatform();
setInterval(checkStatus, 25);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);




// Original movement mechanic
/* function main(x, y) {
    const element = newImage('assets/stand.png')
    element.style.zIndex = 1;

    function handleDirectionChange(direction) {
        if (direction === null) {
            element.src = `assets/stand.png`
        }
        if (direction === 'left') {
            element.src = `assets/run_back.png`
        }
        if (direction === 'jump') {
            element.src = `assets/jump.png`
        }
        if (direction === 'right') {
            element.src = `assets/run.png`
        }
        if (direction === 'northeast') {
            element.src = `assets/jump.png`
        }
        if (direction === 'northwest') {
            element.src = `assets/jump_back.png`
        }
    }

    move(element).withArrowKeys(x, y, handleDirectionChange)

    return {
        element: element
    }
} */

    /* function moveWithArrowKeys(left, bottom, callback){
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        function moveCharacter(){ 
            if(direction === 'left'){
                x-=1
            }
            if(direction === 'jump'){
                y+=1
            }
            if(direction === 'right'){
                x+=1
            }
            if(direction === 'northeast'){
                x+=1
                y+=1
            }
            if(direction === 'northwest'){
                x-=1
                y+=1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'

            //track if character move off screen
            if(element.style.left < -75 + 'px'){
                reset()
            }
        }
        
        setInterval(moveCharacter, 1)
        
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                direction = 'left'
            }
            if(e.key === 'ArrowUp'){
                direction = 'jump'
            }
            if(e.key === 'ArrowRight'){
                direction = 'right'
            }
            if(e.key === 'ArrowRight' && e.key === 'ArrowUp'){
                direction = 'northeast'
            }
            if(e.key === 'ArrowLeft' && e.key === 'ArrowUp'){
                direction = 'northwest'
            }
            callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            direction = null
            callback(direction)
        })
    } */

/* function gravity(element) {
    let y = bottom;
    function fall(){
        (y -= 1)
    }
    element.style.bottom = fall + 'px'
    setInterval(fall, 1)
}

gravity(main) */

//create main character
/* function spawn(character,x,y) {
const pc = character(x,y)
}
addEventListener(onload,spawn(main,10,130)) */

//ability to reset from start if death/move off screen
/* function reset() {
    delete(main.newImage)
    move(main.newImage).to(10, 130)
} */

// spike logic

// const spike = 
// if player intersects with element, player is reset

//platform element

// death event
// death screen includes message and replay option also include current score

// if user intersects star then remove star and increase score count

// when all star(s) collected
// win event including replay option
// include score and possibly time?

// reset button, resets time, position, health, score, stars
// track time, begins on load
/* addEventListener(onload, () => {
    
}) */