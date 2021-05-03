let playerState = 'down';
let gameRunning = false;
let dialogShowing = true;
let timer = document.getElementById('timer');
let skipButton = document.getElementById('skip-button');
let timeLeft = 300000;
let timerMinutes = '05'
let timerSeconds = '00'
timer.innerHTML = timerMinutes + ':' + timerSeconds
let timeOut = false
let multibox = false
let hasNeedle = false
let clearLevelOne = false
let openingPlayed = false
let neverAgain = false

function numberToString(num) {
    if (num < 10) {
        return '0' + num.toString()
    } else {
        return num.toString()
    }
}

skipButton.addEventListener('click', ()=> {
    toggleDialog()
    skipButton.classList.remove("revealed")
    multibox = false
    if (levelTwoRunning) {
        openingPlayed = true;
        bX = 300;
        bY = 450;
        neverAgain = true
    }
})

function tick() {
    let numberSeconds = Number(timerSeconds)
    let numberMinutes = Number(timerMinutes)
    
    const _tick = setInterval(() => {
        if (timeLeft > 0 && !dialogShowing && (gameRunning || levelTwoRunning)) {
            if (numberSeconds > 0) {
                numberSeconds -= 1
            } else {
                numberSeconds = 59
                numberMinutes -= 1
            }
            timer.innerHTML = numberToString(numberMinutes) + ':' + numberToString(numberSeconds)
            timeLeft -= 1000
        } else if (timeLeft === 0){
            timeOut = true;
            timeOutFunc()
            gameRunning = false;
            clearInterval(_tick)
        }
    }, 1000)
}

window.addEventListener('keydown', function(e) {
    dialog.classList.remove("first-box")
    if (!gameRunning && !clearLevelOne) {
        tick()
        while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
        gameRunning = true
        counter = 0
        appendtoDialog(toSayLevelOne.opening[0].string)
        multibox = true
        skipButton.classList.add("revealed")
        const open = setInterval(() => {
                if (counter === 2 || multibox === false) clearInterval(open);
                setTimeout(() => {
                    if (dialogShowing && multibox) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                }, 3000)
                setTimeout(() => {
                    if (multibox) appendtoDialog(toSayLevelOne.opening[counter].string)
                }, 3000)
                counter++
            }, 4000)
            setTimeout(() => {
                if (dialogShowing && multibox && !clearLevelOne) toggleDialog()
                if (!levelTwoRunning) skipButton.classList.remove("revealed")
            }, 22000)
        }
    }
)

const keys = []

function toggleDialog() {
    if (!dialogShowing) {
        dialog.classList.add("revealed")
        dialogShowing = true
    } else {
        dialog.classList.remove("revealed")
        while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
        dialogShowing = false
    }
}

const canvas = document.getElementById("cage");
const dialog = document.getElementById("talks-to-player")

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 450;


const toSayLevelOne = {
    opening: [
        {string: "It's late evening in the farmhouse. "}, 
        {string: "You were tasked with drugging the farmer's cat so that your fellows could complete their work in safety... "},
        {string: "...but you have been captured and placed in this cage. "},
        {string: "You must escape and complete your mission. You don't have much time. "}
    ],
    water: [
        {string: "A water dish is slid through the edge of the cage. Hmm... "}
    ],
    food: [
        {string: "A generous serving of some not-what-the-people-eat. Is that cat food? Pass. "}
    ],
    cageNoNeedle: [
        {string: "The opening of the cage is locked. It doesn't look very sturdy. "}
    ],
    haystack: [
        {string: "A pile of soft hay has been provided for you to sleep on, and -Ouch!- What's this? -> "}, 
        {string: "There was a needle under it. This could come in handy. "}
    ],
    cageWithNeedle: [
        {string: "You twist and probe and pry with the needle but the lock won't budge! You'll have to find another way. "}
    ],
    onWin: [
        {string: "You did it; you're out! Out of the frying pan and into the fire, that is. You jump down and have a look around. "}
    ]
}


let openingCharacters = []

function appendtoDialog(str) {
    str.split("").forEach((char) => {
        let span = document.createElement("span");
        span.textContent = char;
        dialog.appendChild(span);
        openingCharacters.push({
            span: span,
            isSpace: char === " ",
            delayAfter: str === toSayLevelOne.opening[1].string || toSayLevelTwo.opening[1].string ? 30 : 50,
            classes: str.classes || []
        })
    })
    revealOneCharacter(openingCharacters)
}

function revealOneCharacter(list) {
    let next = list.splice(0, 1)[0];
    let delay;
    if (next) {
        next.span.classList.add("revealed")
        delay = next.isSpace ? 0 : next.delayAfter;
    }
    if (list.length > 0) {
        setTimeout(function() {
            revealOneCharacter(list);
        }, delay)
    }
}

const images = {};
images.player = new Image();
images.player.src = 'mouse_brown.png';
images.tub = new Image();
images.tub.src = 'bathtub_with_water.PNG'
images.left_wall = new Image();
images.left_wall.src = 'left_wall_cropped_fence.PNG'
images.right_wall = new Image();
images.right_wall.src = 'right_wall_cropped_fence.PNG'
images.wall = new Image();
images.wall.src = 'cropped_fence.PNG'
images.gate = new Image();
images.gate.src = 'gate.PNG'
images.cell_rug = new Image();
images.cell_rug.src = 'cell_rug.PNG'
images.bowl = new Image();
images.bowl.src = 'bowl.PNG'
images.hay = new Image();
images.hay.src = 'hay.PNG'

const playerWidth = 50;
const playerHeight = 50;



let gameFrame = 0;
const staggerFrames = 5;
const mouseActions = []


const mouseStates = [
    {
        name: 'up',
        frames: 3
    },
    {
        name: 'right',
        frames: 3
    },
    {
        name: 'down',
        frames: 3
    },
    {
        name: 'left',
        frames: 3
    }
]

mouseStates.forEach((state, idx) => {
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++) {
        let posX = j * playerWidth;
        let posY = idx * playerHeight;
        frames.loc.push({x: posX, y: posY})
    }
    mouseActions[state.name] = frames;
})


let playerX = 300;
let playerY = 200;
let tubX = 0
let tubY = 260
let moving = false;

const playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    if (!clearLevelOne) ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
    if (clearLevelOne) ctxTwo.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    moving = true
})

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
    moving = false
})

let alreadyHere = false

function checkStep() {

    if (playerY <= 110 && playerY >= 42 && playerX >=24 && playerX <= 96 && !alreadyHere) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.food[0].string)
            toggleDialog()

            setTimeout(() => {
                toggleDialog()
            }, 4000)
        }
    } else if (playerY <= 110 && playerY >= 42 && playerX >=24 && playerX <= 96) {
        alreadyHere = true
    } else if (playerY <= 110 && playerY >= 68 && playerX >=360 && playerX <= 474 && !alreadyHere && !hasNeedle) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.haystack[0].string)
            toggleDialog()
            setTimeout(() => {
                if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                }, 4000)
            setTimeout(() => {
                appendtoDialog(toSayLevelOne.haystack[1].string)
            }, 4000)
            setTimeout(() => {
                toggleDialog()
            }, 8000)
        }
        hasNeedle = true
    } else if (playerY <= 110 && playerY >= 68 && playerX >=360 && playerX <= 474) {
        alreadyHere = true
     } else if (playerY <= 248 && playerY >= 200 && playerX >=525 && playerX && !alreadyHere && !hasNeedle) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.cageNoNeedle[0].string)
            toggleDialog()

            setTimeout(() => {
                toggleDialog()
            }, 4000)
        }
    } else if (playerY <= 248 && playerY >= 200 && playerX >=525 && !alreadyHere && hasNeedle) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.cageWithNeedle[0].string)
            toggleDialog()

            setTimeout(() => {
                toggleDialog()
            }, 5000)
        }
        hasNeedle = true
    } else if (playerY <= 248 && playerY >= 200 && playerX >=525) {
        alreadyHere = true
    }else {
        alreadyHere = false
    }
}

function movePlayer() {
    
    if (!dialogShowing && !clearLevelOne){
       
        if (playerY >= 445 && gameRunning) {
            levelOneWin()
        } 
        if(keys['ArrowUp'] && playerY > 25){
            playerY -= playerSpeed;
            playerState = 'up';
            checkStep()
            moving = true;
        } else if (keys['ArrowDown']){
            if (playerY === (tubY-24) && playerX <= tubX+115) {
                playerY += playerSpeed / 4;
                playerState = 'down';
                moving = true;
                tubY += playerSpeed / 4;
            } else if (playerY < 360) {
                playerY += playerSpeed;
                playerState = 'down';
                moving = true;
                checkStep()
            }
            moving = true;
        } else if (keys['ArrowLeft'] && playerX > 20){
            if (playerX > tubX+130) {
                playerX -= playerSpeed;
                playerState = 'left';
                checkStep()
                moving = true;
            } else if (playerX <= tubX+126 && playerY < tubY-30) {
                playerX -= playerSpeed;
                playerState = 'left';
                checkStep()
                moving = true;
            } else if ((playerX === tubX+126 && playerY >= tubY-30)) {
                if (!dialogShowing) {
                    while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                    appendtoDialog(toSayLevelOne.water[0].string)
                    toggleDialog()
                    setTimeout(() => {
                        toggleDialog()
                    }, 3000)
                }
            }
        } else if (keys['ArrowRight'] && playerX < 530){
            playerX += playerSpeed;
            playerState = 'right';
            checkStep()
            moving = true;
        }
    }
}

function timeOutFunc() {
    toggleDialog()
    appendtoDialog(toSayLevelTwo.timeOut[0].string)
}

function levelOneWin() {
    gameRunning = false;
    clearLevelOne = true;
    appendtoDialog(toSayLevelOne.onWin[0].string)
    toggleDialog()
    setTimeout(() => {
        toggleDialog()
        levelTwoRunning = true
        startAnimating()
        canvas.classList.add('hide')
    }, 6000)
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    if (!clearLevelOne) animateLevelOne();
    if (clearLevelOne) animateLevelTwo();
}
// ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
function animateLevelOne(){

    if (!clearLevelOne) requestAnimationFrame(animateLevelOne);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)
    }
    document.getElementById('')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let position = Math.floor(gameFrame / staggerFrames) % 3
    let playerFrameX = playerWidth * position;
    let playerFrameY = mouseActions[playerState].loc[position].y;
    ctx.drawImage(images.tub, 3, 20, 150, 200, tubX, tubY, 140, 200)
    ctx.drawImage(images.hay, 0, 0, 150, 150, 370, 60, 150, 150)
    // ctx.drawImage(images.wire, 0, 0, 60, 30, 400, 120, 60, 30)
    ctx.drawImage(images.bowl, 0, 0, 75, 75, 45, 75, 75, 75)
    ctx.drawImage(images.wall, 0, 0, 150, 200, 135, 400, 140, 200)
    ctx.drawImage(images.wall, 0, 0, 150, 200, 260, 400, 140, 200)
    ctx.drawImage(images.wall, 0, 0, 150, 200, 390, 400, 140, 200)
    ctx.drawImage(images.wall, 0, 0, 150, 200, 520, 400, 140, 200)
    ctx.drawImage(images.wall, 0, 3, 150, 200, 0, 0, 140, 200)
    ctx.drawImage(images.wall, 0, 3, 150, 200, 130, 0, 140, 200)
    ctx.drawImage(images.wall, 0, 3, 150, 200, 260, 0, 140, 200)
    ctx.drawImage(images.wall, 0, 3, 150, 200, 390, 0, 140, 200)
    ctx.drawImage(images.wall, 0, 3, 150, 200, 520, 0, 140, 200)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 575, 45, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 575, 135, 25, 100)
    ctx.drawImage(images.gate, 0, 0, 25, 100, 575, 220, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 575, 290, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 575, 350, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 575, 45, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 575, 135, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 575, 290, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 575, 350, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 0, 45, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 0, 135, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 0, 220, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 0, 305, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 0, 45, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 0, 135, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 0, 220, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 0, 305, 25, 100)
    ctx.drawImage(images.right_wall, 0, 0, 25, 100, 0, 380, 25, 100)
    ctx.drawImage(images.left_wall, 0, 0, 25, 100, 0, 380, 25, 100)
    if (gameRunning) {
        drawSprite(images.player, playerFrameX, playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight)
        movePlayer()
    }
    // if (moving === true) 
    gameFrame++;
}




// ***********************LEVEL TWO***************************//


// ***********************LEVEL TWO***************************//


const toSayLevelTwo = {
    opening: [
        {string: "Dragon is waiting by the door for someone to let her out. "}, 
        {string: "Her food bowl is on the other side of the room. You need to empty a packet of sedatives into it and draw her back to it. "},
        {string: "There's where you came in and there's your packet there on the ground! You had almost made it. "},
    ],
    hide: [
        {string: "\"There's a snake in my boots.\" "},
        {string: "HIDE! "}
    ],
    packet: [
        {string: "Alright, you've got it. Get back to the dish. "}
    ],
    runForIt: [
        {string: "RUN FOR IT! "}
    ],
    leftWithoutDruggingCat: [
        {string: "You can't go yet! You must complete your mission. "}
    ],
    foodNoPacket: [
        {string: "Run grab your packet from the other room. "}
    ],
    foodWithPacket: [
        {string: "You empty the sedatives into the dish. Now to get her attention... "}
    ],
    onWin: [
        {string: "You made it. Now everyone will be safe while they work. Excellent job! "}
    ],
    onLose: [
        {string: "You got got. As the cat's jaws crunch into you, you hope your fellows will not meet the same fate due to your failure. "},
        {string: "To play again, press F5. "}
    ],
    hitAToyOnce: [
        {string: "Be careful! "},
    ],
    timeOut: [
        {string: "You hear a voice ask, \"Dragon, do you need to go out?\" A door opens and closes. Press F5 to play again. "},
    ]
}

let winLevelTwo = false
let gotPacket = false
let letHitToyOnce = false
let druggedFood = false
let levelTwoRunning = false
let showMouse = true

if (clearLevelOne) {
    levelTwoRunning = true
}


if (levelTwoRunning) {
    playerX = 600;
    playerY = 550;
}

images.levelTwoBackground = new Image()
images.levelTwoBackground.src = 'level2_background.jpg'
images.envelope = new Image()
images.envelope.src = 'envelope.PNG'
let envelopeDX = 1395
let envelopeDY = 277

let mouseholeX = 1580
let mouseholeY = 137
let mouseholeW = 1620
let mouseholdH = 147

let dresserLeg1X = 1487
let dresserLeg1Y = 145
let dresserLeg1W = 1507
let dresserLeg1H = 165

let dresserLeg2X = 1737
let dresserLeg2Y = 145
let dresserLeg2W = 1757
let dresserLeg2H = 165

let woodyX = 1438
let woodyY = 632
let woodyW = 1503
let woodyH = 662

let dishX = 1672
let dishY = 695
let dishW = 1737
let dishH = 832

let rexX = 1069
let rexY = 557
let rexW = 1099
let rexH = 607

let tableX = 300
let tableY = 695
let tableW = 765
let tableH = 825

let dollhouseStopX = 1257
let dollhouseStopY = 495
let dollhouseStopW = 1444
let dollhouseStopH = 585

let dollhouseMidX = 1280
let dollhouseMidY = 425
let dollhouseMidW = 1425
let dollhouseMidH = 495

let dollhouseTopX = 1288
let dollhouseTopY = 385
let dollhouseTopW = 1408
let dollhouseTopH = 405


const canvasTwo = document.getElementById("level-two");
const ctxTwo = canvasTwo.getContext("2d");
let levelTwoHeight = 900;
let levelTwoWidth = 1800;
canvasTwo.height = 450;
canvasTwo.width = 600;
let bX = 300;
let bY = 450;
let bW = 600;
let bH = 450;




// ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)

// function drawBgImg() {
//     images.levelTwoBackground = new Image();
//     images.levelTwoBackground.src = 'level2_background.jpg';
//     images.levelTwoBackground.onload = () => {
//         return ctxTwo.drawImage(images.levelTwoBackground, 0, 0, canvasTwo.width, canvasTwo.height);
//     }
// }

function animateLevelTwo(){
    requestAnimationFrame(animateLevelTwo);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
    }
    if (!openingPlayed) {
        
        while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
        counter = 0
        appendtoDialog(toSayLevelTwo.opening[0].string)
        toggleDialog()
        let hitFirst = false
        let hitSecond = false
        let hitThird = false
        multibox = true
        let moveCounter = 0
        const moveLeft = setInterval(() => {
            playerX = -(bX - 600);
            playerY = -(bY - 550);
            if (!multibox) clearInterval(moveLeft)
            if (bX === 0 && multibox) {
                hitFirst = true
            } else if (bX > 0 && !hitFirst && multibox) {
                bX -= 10
            }
            if (hitFirst && moveCounter < 25 && multibox) {
                moveCounter++
            } else if (bX < 1200 && hitFirst && multibox) {
                bX +=10
            } else if (bX === 1200 && multibox) {
                hitSecond = true
            }
            if (hitSecond && moveCounter < 50 && multibox) {
                moveCounter++
            } else if (bX === 1200 && bY > 0 && hitSecond && multibox) {
                bY -= 10
            } else if (bY === 0 && multibox) {
                hitThird = true
            }
            if (hitThird && moveCounter < 95 && multibox) {
                moveCounter++
            } else if (hitThird && moveCounter === 95 && multibox) {
                bX = 300;
                bY = 450;
                playerX = 300;
                playerY = 100;
                clearInterval(moveLeft)
            }

        }, 100)
        skipButton.classList.add("revealed")
        const open = setInterval(() => {
                if (counter === 1 || !multibox) clearInterval(open);
                setTimeout(() => {
                    if (dialogShowing && multibox) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                }, 3000)
                setTimeout(() => {
                    if (multibox) appendtoDialog(toSayLevelTwo.opening[counter].string)
                }, 3000)
                counter++
            }, 10000)
            setTimeout(() => {
                if (dialogShowing && multibox) toggleDialog()
                skipButton.classList.remove("revealed")
            }, 28000)
            openingPlayed = true
    }
    ctxTwo.clearRect(0, 0, levelTwoWidth, levelTwoHeight);
    let position = Math.floor(gameFrame / staggerFrames) % 3;
    let playerFrameX = playerWidth * position;
    let playerFrameY = mouseActions[playerState].loc[position].y;
    ctxTwo.drawImage(images.levelTwoBackground, bX, bY, bW, bH, 0, 0, canvasTwo.width, canvasTwo.height)
    ctxTwo.drawImage(images.envelope, 0, 0, 30, 30, -(bX - envelopeDX), -(bY - envelopeDY), 30, 30)
    if (levelTwoRunning && showMouse) {
        drawSprite(images.player, playerFrameX, playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
        movePlayerLevelTwo()
    }
    // if (moving === true) 
    gameFrame++;
}

function checkStepLevel2() {

    if (playerY <= 110 && playerY >= 42 && playerX >=24 && playerX <= 96 && !alreadyHere) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.food[0].string)
            toggleDialog()

            setTimeout(() => {
                toggleDialog()
            }, 4000)
        }
    } else if (playerY <= 110 && playerY >= 42 && playerX >=24 && playerX <= 96) {
        alreadyHere = true
    } else if (playerY <= 110 && playerY >= 68 && playerX >=360 && playerX <= 474 && !alreadyHere && !hasNeedle) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.haystack[0].string)
            toggleDialog()
            setTimeout(() => {
                if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                }, 4000)
            setTimeout(() => {
                appendtoDialog(toSayLevelOne.haystack[1].string)
            }, 4000)
            setTimeout(() => {
                toggleDialog()
            }, 8000)
        }
        hasNeedle = true
    } else if (playerY <= 110 && playerY >= 68 && playerX >=360 && playerX <= 474) {
        alreadyHere = true
     } else if (playerY <= 248 && playerY >= 200 && playerX >=525 && playerX && !alreadyHere && !hasNeedle) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.cageNoNeedle[0].string)
            toggleDialog()

            setTimeout(() => {
                toggleDialog()
            }, 4000)
        }
    } else if (playerY <= 248 && playerY >= 200 && playerX >=525 && !alreadyHere && hasNeedle) {
        alreadyHere = true
        if (!dialogShowing){
            appendtoDialog(toSayLevelOne.cageWithNeedle[0].string)
            toggleDialog()

            setTimeout(() => {
                toggleDialog()
            }, 5000)
        }
        hasNeedle = true
    } else if (playerY <= 248 && playerY >= 200 && playerX >=525) {
        alreadyHere = true
    }else {
        alreadyHere = false
    }
}

function movePlayerLevelTwo() {
    if (!dialogShowing && levelTwoRunning){
       
        if(keys['ArrowUp']){
            if (bX < 700 && bY >= 450 && playerY >= 15 && !((playerY + bY + 11) >= tableH)) {
                playerY -= playerSpeed;
                playerState = 'up';
                // checkStepLevel2()
                moving = true;
            } else if ((((bX + playerX + playerWidth) > (dollhouseStopX)) && (bX + (playerX+25) < dollhouseStopW)) && ((((bY + playerY + 25) <= dollhouseStopH)) && ((bY + playerY + 25) >= dollhouseStopY))) {
            } else if ((bX > 1200 && bY > 0 && ((bY + playerY) > 100)) || (playerX + bX > 1200 && bY > 0) && ((bY + playerY) > 120)) {
                bY -= playerSpeed
                playerState = 'up';
            } else if (((bX + playerX) < 1250) && (bY + playerY > 465)) {
                if (((playerX + bX) > tableW)) {
                    playerY -= playerSpeed;
                    playerState = 'up';
                    // checkStepLevel2()
                    moving = true;
                }
            } else if (((bX + playerX) >= 1200) && ((bY + playerY) > 120)) {
                console.log('constrain for mousehole here')
                    playerY -= playerSpeed;
                    playerState = 'up';
                    // checkStepLevel2()
                    moving = true;
            }
        } else if (keys['ArrowDown']){
            if (playerY > (-((bY+playerHeight) - (tableY))) && playerX <= (-(bX - (tableW -4)))) {
                
            } else if (bY < 450 && playerY > 360) {
                bY += playerSpeed;
                playerState = 'down';
            } else if (playerY < 360) {
                playerY += playerSpeed;
                playerState = 'down';
                moving = true;
                // checkStepLevel2()
            }
            moving = true;
        } else if (keys['ArrowLeft']){
            if (((bY + playerY) > 450) && bX > 350 && playerX < 50) {
                if ((playerX + bX) > tableW) {
                    bX -= playerSpeed
                    playerState = 'left';
                } else if (((playerX + bX) < tableW) && ((playerY + playerHeight + bY) < tableY)) {
                    bX -= playerSpeed
                    playerState = 'left';
                } else if (((playerX + bX) < tableW) && ((playerY + bY + 11) >= tableH)) {
                    bX -= playerSpeed
                    playerState = 'left';
                }
            } else if (((bY + playerY) > 450) && ((bX + playerX) > 350)) {
                if ((playerX + bX) > tableW) {
                    console.log(dollhouseStopW)
                    console.log(dollhouseStopH)
                    console.log(dollhouseStopY)
                    console.log(bY + playerY)
                    if (((bX + playerX) <= dollhouseStopW) && (((bY + playerY +25) > dollhouseStopY) && ((bY + playerY + 25) < dollhouseStopH))){

                    } else {
                        playerX -= playerSpeed
                        playerState = 'left';
                    }
                } else if (((playerX + bX) < tableW) && ((playerY + playerHeight + bY) < tableY)) {
                    playerX -= playerSpeed
                    playerState = 'left';
                } else if (((playerX + bX) < tableW) && ((playerY + bY + 11) >= tableH)) {
                    playerX -= playerSpeed
                    playerState = 'left';
                }
                moving = true;
            } else if (((bY + playerY) < 450) && ((bX + playerX) > 1200)) {
                playerX -= playerSpeed;
                playerState = 'left';
                // checkStepLevel2()
                moving = true;
            }
           
        } else if (keys['ArrowRight']){
            if (bX <= 1200 && playerX > 400) {
                bX += playerSpeed
            } else if (playerX < 505) {
                playerX += playerSpeed;
            }
            playerState = 'right';
            // checkStepLevel2()
            moving = true;
        }
    }
}

startAnimating(10);