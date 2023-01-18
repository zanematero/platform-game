// add player icon

function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}

// select player icon as moveable character

function playableCharacter(x, y) {
    const element = newImage('assets/stand.png')
    element.style.zIndex = 1;

    function handleDirectionChange(direction) {
        if (direction === null) {
            element.src = `assets/stand.png`
        }
        if (direction === 'west') {
            element.src = `assets/run_back.png`
        }
        if (direction === 'north') {
            element.src = `assets/jump.png`
        }
        if (direction === 'east') {
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
}

// directional arrow movement

function move(element) {
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
            if(direction === 'west'){
                x-=1
            }
            if(direction === 'north'){
                y+=1
            }
            if(direction === 'east'){
                x+=1
            }
            /* if(direction === 'northeast'){
                x+=1
                y+=1
            }
            if(direction === 'northwest'){
                x-=1
                y+=1
            } */
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        
        setInterval(moveCharacter, 1)
        
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                direction = 'west'
            }
            if(e.key === 'ArrowUp'){
                direction = 'north'
            }
            if(e.key === 'ArrowRight'){
                direction = 'east'
            }
            /* if(e.key === 'ArrowRight' && e.key === 'ArrowUp'){
                direction = 'northeast'
            }
            if(e.key === 'ArrowLeft' && e.key === 'ArrowUp'){
                direction = 'northwest'
            } */
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
}

/* function gravity(element) {
    let y = bottom;
    element.style.bottom = fall()
    function fall(){
        setInterval((y -= 1), 1)
    }
    element.style.bottom = fall + 'px'
}

gravity(playableCharacter,0) */

const pc = playableCharacter(10,130)

// spike logic

// const spike = 
// if player intersects with spike then damage taken
// some sort of visual effect to show damage has been taken

// death event
// death screen includes message and replay option also include current score

// if user intersects star then remove star and increase score count

move(newImage('assets/turkey.png')).to(450, 140)
move(newImage('assets/spike.png')).to(200, 140)

// when all star(s) collected
// win event including replay option
// include score and possibly time?

// reset button, resets time, position, health, score, stars
// track time, begins on load