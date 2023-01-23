// Function to add game elements
function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}

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
    x: 10,
    y: 130,
    friction: 0,
    gravity: 0,
    jumping: true,
    height: 85,
    width: 85,
    jumpAnimation: "assets/jump.png",
    leftJumpAnimation: "assets/jump_back.png",
    leftAnimation: "assets/run_back.png",
    rightAnimation: "assets/run.png",
    standAnimation: "assets/stand.png",
    stanceCurrent: "assets/stand.png"
};
if (playerInfo.friction > -1 && playerInfo.friction < 1) {
    playerInfo.stanceCurrent = playerInfo.standAnimation;
}
// Assigning canvas element for player to detect collision
function createPlayer() {
    ctx.fillStyle = "#F08080";
    img = newImage(playerInfo.stanceCurrent);
    ctx.drawImage(img, (playerInfo.x) - playerInfo.width, (playerInfo.y) - playerInfo.height);
}

// Movement
var keysCurrent = {
    right: false,
    left: false,
    jump: false
}
var movementGravity = 0.5;
var movementFriction = 0.5;

function keydown(e) {
    // Left arrow
    if (e.keycode == 37) {
        keysCurrent.left = true;
    }
    // Up arrow
    if (e.keycode == 38) {
        if (playerInfo.jump == false) {
            playerInfo.gravity = -5;
        }
    }
    // Right arrow
    if (e.keycode == 39) {
        keysCurrent.right = true;
    }
}
document.addEventListener("keydown", keydown);

function keyup(e){
    if (e.keycode == 37) {
        keysCurrent.left = false;
    }
    if (e.keycode == 38) {
        if (playerInfo.gravity < -1) {
            playerInfo.gravity = -3;
        }
    }
    if (e.keycode == 39) {
        keysCurrent.right = false;
    }
}
document.addEventListener("keyup", keyup);

/* move(newImage('assets/turkey.png')).to(450, 140)
move(newImage('assets/spike.png')).to(200, 140) */

// Platform creation
var platforms = []
var platformCount = 5;
function renderPlatform() {
    ctx.fillStyle = "#45597E";
    // using platforms.length in case we want to add or remove platforms 
    for (i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

// Platform location assignment
function createPlatform() {
    for (i = 0; i < platformCount; i++) {
        platforms.push(
            {
                x: 100 * (8 * i),
                y: 200 + (18 * i),
                width: 100,
                height: 10
            }
        );
    }
}

// Logic to check and apply movement/collision
function checkStatus() {
    if (playerInfo.jumping == false) {
        playerInfo.friction *= movementFriction;
    } else {
        playerInfo.gravity += movementGravity;
        playerInfo.stanceCurrent = playerInfo.jumpAnimation
    }
    playerInfo.jumping = true;

    if (keysCurrent.left) {
        playerInfo.friction = -5;
        playerInfo.stanceCurrent = playerInfo.leftAnimation
    }
    if (keysCurrent.right) {
        playerInfo.friction = 5;
        playerInfo.stanceCurrent = playerInfo.rightAnimation
    }
    playerInfo.y += playerInfo.gravity;
    playerInfo.x += playerInfo.friction;

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
    if (playerInfo.friction > -1 && playerInfo.friction < 1) {
        playerInfo.stanceCurrent = playerInfo.standAnimation;
    }
    createCanvas();
    createPlayer();
    renderPlatform();

    document.querySelector('#x_v').innerHTML = playerInfo.friction;
    document.querySelector('#y_v').innerHTML = playerInfo.gravity;
}   
createPlatform();
setInterval(checkStatus, 22);

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

/* function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function moveWithArrowKeys(left, bottom, callback){
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
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys,
    }
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