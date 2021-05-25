window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

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
// let intervals = []
// let timeOuts = []

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

let ticking;

function tick() {
    let numberSeconds = Number(timerSeconds)
    let numberMinutes = Number(timerMinutes)
    
    ticking = setInterval(() => {
        if (timeLeft > 0 && !dialogShowing && !winLevelTwo && (gameRunning || levelTwoRunning)) {
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
            clearInterval(ticking)
        }
    }, 1000)
    // intervals.push(ticking)
}

let openInterval
let one
let two
let three
let four
let five
let six
let seven
let eight
let nine
let ten
let eleven
let twelve
let thirteen
let fourteen
let fifteen
let sixteen
let seventeen
let eighteen
let nineteen
let twenty
let twentyOne
let twentyTwo
let twentyThree
let twentyFour
let twentyFive
let twentySix
let twentySeven
let twentyEight
let twentyNine
let thirty
let thirtyOne
let thirtyTwo
let thirtyThree
let thirtyFour

function startGame() {
    dialog.classList.remove("first-box")
    if (!gameRunning && !clearLevelOne) {
        tick()
        while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
        gameRunning = true
        counter = 0
        appendtoDialog(toSayLevelOne.opening[0].string)
        multibox = true
        skipButton.classList.add("revealed")
        openInterval = setInterval(() => {
                if (counter === 2 || multibox === false) clearInterval(openInterval);
                one = setTimeout(() => {
                    if (dialogShowing && multibox) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                }, 3000)
                two = setTimeout(() => {
                    if (multibox) appendtoDialog(toSayLevelOne.opening[counter].string)
                }, 3000)
                counter++
            }, 4000)
            // intervals.push(openInterval)
            // timeOuts.push(one, two)
            three = setTimeout(() => {
                if (dialogShowing && multibox && !clearLevelOne) toggleDialog()
                if (!levelTwoRunning) skipButton.classList.remove("revealed")
            }, 22000)
            // timeOuts.push(three)
        }
    }

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
        four = setTimeout(function() {
            revealOneCharacter(list);
        }, delay)
        // timeOuts.push(four)
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
    if ((gameRunning || levelTwoRunning) && (keys['r'] || keys['R'])) {
        restart()
    } else if (!gameRunning && !levelTwoRunning && !keys['r'] && !keys['R']) {
        startGame()
    }
    moving = true
})

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
    moving = false
})

let alreadyHere = false

let state = 'inCage'
// This function is called when the player moves and performs actions based on change of state
function checkStep() {
    switch (state) {
        // First set of case statements check whether the player has moved away from an object
        case 'onHay':
            if (!hitHay(playerX, playerY)) state = 'inCage'
            break
        case 'onFood':
            if (!hitFood(playerX, playerY)) state = 'inCage'
            break
        case 'onGate':
            if (!hitGate(playerX, playerY)) state = 'inCage'
            break
        // This statement calls a function that checks the possible changes from the 'inCage' state
        case 'inCage': 
            // Plays the appropriate message when the player collides with the hay and does not have the needle
            // No action necessary for subsequent hits
            if (hitHay(playerX, playerY) && !hasNeedle) {
                state = 'onHay'
                if (!dialogShowing){
                    appendtoDialog(toSayLevelOne.haystack[0].string)
                    toggleDialog()
                    six = setTimeout(() => {
                        if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                    }, 4000)
                    seven = setTimeout(() => {
                        appendtoDialog(toSayLevelOne.haystack[1].string)
                    }, 4000)
                    eight = setTimeout(() => {
                        toggleDialog()
                    }, 8000)
                }
                hasNeedle = true
            // Plays the appropriate message when the player collides with the food
            } else if (hitFood(playerX, playerY)) {
                state = 'onFood'
                if (!dialogShowing){
                    appendtoDialog(toSayLevelOne.food[0].string)
                    toggleDialog()

                    five = setTimeout(() => {
                        toggleDialog()
                    }, 4000)
                }
            // Plays the appropriate message when the player collides with the gate
            } else if (hitGate(playerX, playerY)) {
                state = 'onGate'
                // a different dialog will play depending on whether the player has acquired the needle
                if (!hasNeedle) {
                    if (!dialogShowing){
                        appendtoDialog(toSayLevelOne.cageNoNeedle[0].string)
                        toggleDialog()
                        nine = setTimeout(() => {
                            toggleDialog()
                        }, 4000)
                    }
                } else if (hasNeedle) {
                    if (!dialogShowing){
                        appendtoDialog(toSayLevelOne.cageWithNeedle[0].string)
                        toggleDialog()
                        ten = setTimeout(() => {
                            toggleDialog()
                        }, 5000)
                    }
                }
            }
}

function hitFood(pX, pY) {
    let detected = false
        if (
            pX < 24 + 72 &&
            pX > 24 &&
            pY > 42 &&
            pY < 42 + 68
            ) {
                detected = true
        }
    return detected
}

function hitGate(pX, pY) {
    let detected = false
        if (
            pX >= 525 &&
            pY >= 200 &&
            pY <= 200 + 48
            ) {
                detected = true
        }
    return detected
}

function hitHay(pX, pY) {
    let detected = false
        if (
            pX < 360 + 114 &&
            pX > 360 &&
            pY + 15 > 68 &&
            pY  - 30 < 68 + 42
            ) {
                detected = true
        }
    return detected
    }
}

function restart() {
    if (keys['r'] || keys['R']) {
        window.location.reload()
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
            } else if (playerX <= tubX+115) {
                playerY += playerSpeed
                playerState = 'down';
                checkStep()
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
                    eleven = setTimeout(() => {
                        toggleDialog()
                    }, 3000)
                    // timeOuts.push(eleven)
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
    twelve = setTimeout(() => {
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
    bell: [
        {string: "DING! "},
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
        {string: "You made it. Now everyone will be safe while they work. Excellent job! "},
        {string: "Special thanks to artists who shared their work on opengameart.org. This game would not have been possible without their generosity. "},
        {string: "To play again, press R. "}
    ],
    onLose: [
        {string: "You got got. As the cat's jaws crunch into you, you hope your fellows will not meet the same fate due to your failure. "},
        {string: "To play again, press R. "}
    ],
    sorOfWon: [
        {string: "You got got. At least you have succeeded in your mission and your fellows will not meet the same fate. "},
    ],
    hitAToyOnce: [
        {string: "Be careful! "},
    ],
    hitAToyTwice: [
        {string: "HIDE! "},
    ],
    timeOut: [
        {string: "You hear a voice ask, \"Dragon, do you need to go out?\" A door opens and closes. Press R to play again. "},
    ]
}

let winLevelTwo = false
let gotPacket = false
let letHitToyOnce = false
let druggedFood = false
let levelTwoRunning = false
let showMouse = true
let catComing = false
let behindTable = false
let caughtInHeadlights = false
let behindHouse = false


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
images.cat_look_left = new Image()
images.cat_look_left.src = 'cat_look_left.png'
images.cat_look_right = new Image()
images.cat_look_right.src = 'cat_look_right.png'
images.cat_slow_left = new Image()
images.cat_slow_left.src = 'cat_slow_left.png'
images.cat_slow_right = new Image()
images.cat_slow_right.src = 'cat_slow_right.png'
images.cat_run_left = new Image()
images.cat_run_left.src = 'cat_run_left.png'
images.cat_run_right = new Image()
images.cat_run_right.src = 'cat_run_right.png'
images.cat_run_up = new Image()
images.cat_run_up.src = 'cat_run_up.png'
images.cat_run_down = new Image()
images.cat_run_down.src = 'cat_run_down.PNG'
images.cat_run_up_left = new Image()
images.cat_run_up_left.src = 'cat_run_up_left.png'
images.eating_mouse = new Image()
images.eating_mouse.src = 'eating_mouse.PNG'
images.eating_mouse_look_right = new Image()
images.eating_mouse_look_right.src = 'eating_mouse_look_right.PNG'
images.eating = new Image()
images.eating.src = 'eating.PNG'
images.bellUp = new Image()
images.bellUp.src = 'bellup.PNG'
images.bellFromLeft = new Image()
images.bellFromLeft.src = 'bellfromleft.PNG'
images.bellFromRight = new Image()
images.bellFromRight.src = 'bellfromright.PNG'
images.bluecar = new Image()
images.bluecar.src = 'bluecar.PNG'
images.yellowcar = new Image()
images.yellowcar.src = 'yellowcar.PNG'
images.greycar = new Image()
images.greycar.src = 'greycar.PNG'

let car1 = {
    x: 885,
    y: 630,
    width: 30,
    height: 14
}

let car2 = {
    x: 1035,
    y: 690,
    width: 30,
    height: 14
}

let car3 = {
    x: 1015,
    y: 770,
    width: 30,
    height: 16
}

let car4 = {
    x: 925,
    y: 545,
    width: 30,
    height: 16
}

let car5 = {
    x: 795,
    y: 540,
    width: 30,
    height: 15
}

let car6 = {
    x: 875,
    y: 835,
    width: 30,
    height: 15
}




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

let bellX = 1225
let bellY = 735
let bellUpW = 21
let bellUpH = 30

let bellSideW = 30
let bellSideH = 21

let bellHitLeft = false
let bellHitRight = false


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

let moveLeft
let openLevelTwo

function animateLevelTwo(){
    if (!levelTwoRunning) {
        ctxTwo.clearRect(0, 0, levelTwoWidth, levelTwoHeight);
    } else {
        requestAnimationFrame(animateLevelTwo);
    }
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
        moveLeft = setInterval(() => {
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
        openLevelTwo = setInterval(() => {
                if (counter === 1 || !multibox) clearInterval(openLevelTwo);
                thirteen = setTimeout(() => {
                    if (dialogShowing && multibox) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                }, 3000)
                fourteen = setTimeout(() => {
                    if (multibox) appendtoDialog(toSayLevelTwo.opening[counter].string)
                }, 3000)
                counter++
            }, 10000)
            fifteen = setTimeout(() => {
                if (dialogShowing && multibox) toggleDialog()
                skipButton.classList.remove("revealed")
            }, 28000)
            openingPlayed = true
    }
    ctxTwo.clearRect(0, 0, levelTwoWidth, levelTwoHeight);
    let catStaggerFrames;
    if (catState === 'up' || catState === 'up_left' || catState === 'down') {
            catWidth = catUpWidth;
            catHeight = catUpHeight;
            catStaggerFrames = 9;
            if (catState === 'up_left') {
                catImage = images.cat_run_up_left;
            } else if (catState === 'down') {
                catImage = images.cat_run_down;
            } else {
                catImage = images.cat_run_up;
            }
        } else if (catState === 'run_right' || catState === 'run_left' || catState === 'eat_food') {
            catStaggerFrames = 9;
            catWidth = catRunWidth;
            catHeight = catRunHeight;
            if (catState === 'run_right') {catImage = images.cat_run_right}
            if (catState === 'run_left') {catImage = images.cat_run_left}
            if (catState === 'eat_food') {catImage = images.eating}
        } else {
            catHeight = catLookHeight;
            if (catState === 'slow_right') {
                catWidth = catSlowWidth;
                catImage = images.cat_slow_right
                catStaggerFrames = 20;
            }
            if (catState === 'slow_left') {
                catWidth = catSlowWidth;
                catImage = images.cat_slow_left
                catStaggerFrames = 20;
            }
            if (catState === 'look_right') {
                catWidth = catLookRightWidth
                catImage = images.cat_look_right
                catStaggerFrames = 50;
            }
            if (catState === 'look_left') {
                catWidth = catLookWidth;
                catImage = images.cat_look_left
                catStaggerFrames = 50;
            }
            if (catState === 'eat_left') {
                catWidth = catLookWidth;
                catImage = images.eating_mouse
                catStaggerFrames = 50;
            }
            if (catState === 'eat_right') {
                catWidth = catLookWidth;
                catImage = images.eating_mouse_look_right
                catStaggerFrames = 50;
            }
        }
    let bellImg
    let bellWidth
    let bellHeight
    if (!bellHitLeft && !bellHitRight) {
        bellImg = images.bellUp
        bellWidth = bellUpW
        bellHeight = bellUpH
    } else if (bellHitLeft) {
        bellImg = images.bellFromLeft
        bellX = 1235
        bellY = 745
        bellWidth = bellUpW
        bellHeight = bellUpH
    } else if (bellHitRight) {
        bellImg = images.bellFromRight
        bellX = 1215
        bellY = 745
        bellWidth = bellUpW
        bellHeight = bellUpH
    }
    let position = Math.floor(gameFrame / staggerFrames) % 3;
    let catpos = Math.floor(gameFrame / catStaggerFrames) % catActions[catState].loc.length;
    let playerFrameX = playerWidth * position;
    let playerFrameY = mouseActions[playerState].loc[position].y;
    catFrameX = catActions[catState].loc[catpos].x
    catFrameY = catActions[catState].loc[catpos].y
    if (levelTwoRunning) ctxTwo.drawImage(images.levelTwoBackground, bX, bY, bW, bH, 0, 0, canvasTwo.width, canvasTwo.height)
    if (levelTwoRunning) ctxTwo.drawImage(bellImg, 0, 0, bellWidth, bellHeight, -(bX - bellX), -(bY - bellY), bellWidth, bellHeight)
    if (levelTwoRunning) ctxTwo.drawImage(images.bluecar, 0, 0, car1.width, car1.height, -(bX - car1.x), -(bY - car1.y), car1.width, car1.height)
    if (levelTwoRunning) ctxTwo.drawImage(images.bluecar, 0, 0, car2.width, car2.height, -(bX - car2.x), -(bY - car2.y), car2.width, car2.height)
    if (levelTwoRunning) ctxTwo.drawImage(images.yellowcar, 0, 0, car3.width, car3.height, -(bX - car3.x), -(bY - car3.y), car3.width, car3.height)
    if (levelTwoRunning) ctxTwo.drawImage(images.yellowcar, 0, 0, car4.width, car4.height, -(bX - car4.x), -(bY - car4.y), car4.width, car4.height)
    if (levelTwoRunning) ctxTwo.drawImage(images.greycar, 0, 0, car5.width, car5.height, -(bX - car5.x), -(bY - car5.y), car5.width, car5.height)
    if (levelTwoRunning) ctxTwo.drawImage(images.greycar, 0, 0, car6.width, car6.height, -(bX - car6.x), -(bY - car6.y), car6.width, car6.height)
    if (!gotPacket && levelTwoRunning) ctxTwo.drawImage(images.envelope, 0, 0, 30, 30, -(bX - envelopeDX), -(bY - envelopeDY), 30, 30)
    if (levelTwoRunning && showMouse) {
        drawSprite(images.player, playerFrameX, playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
    }
    
    if (catComing && levelTwoRunning) {
        drawSprite(catImage, catFrameX, catFrameY, catWidth, catHeight, -(bX - catX), -(bY - catY), catWidth, catHeight);
    }
    
    if (!caughtInHeadlights && levelTwoRunning) movePlayerLevelTwo()
    gameFrame++;
}

const catActions = []


const catStates = [
    {
        name: 'up',
        frames: 6
    },
    {
        name: 'up_left',
        frames: 6
    },
    {
        name: 'down',
        frames: 6
    },
    {
        name: 'run_right',
        frames: 6
    },
    {
        name: 'run_left',
        frames: 6
    },
    {
        name: 'slow_right',
        frames: 5
    },
    {
        name: 'slow_left',
        frames: 5
    },
    {
        name: 'look_right',
        frames: 3
    },
    {
        name: 'look_left',
        frames: 3
    },
    {
        name: 'eat_right',
        frames: 1
    },
    {
        name: 'eat_left',
        frames: 1
    },
    {
        name: 'eat_food',
        frames: 1
    }
]

let catLookHeight = 100
let catLookWidth = 120
let catLookRightWidth = 126
let catSlowHeight = 100
let catSlowWidth = 130
let catUpHeight = 137
let catUpWidth = 100
let catRunHeight = 100
let catRunWidth = 137
let catX = 75
let catY = 500
let catRunSpeed = 12
let catSlowSpeed = 6
let catSlowRightSpeed = 10
let catLookSpeed = 0
let catState = 'run_right' 
let movingCat = true
let catWidth;
let catHeight;
let catImage;
let catFrameX
let catFrameY

catStates.forEach((state, idx) => {
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++) {
        if (state.name === 'up' || state.name === 'up_left') {
            let posX = 0;
            let posY = j * catUpHeight;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'down') {
            let posX = 0;
            let posY = j * catUpHeight;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'run_right' || state.name === 'run_left' || state.name === 'eat_food') {
            let posX = j * catRunWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'slow_left') {
            let posX = j * catSlowWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'slow_right') {
            let posX = j * catSlowWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'look_left') {
            let posX = j * catLookWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'look_right') {
            let posX = j * catLookRightWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'eat_right') {
            let posX = j * catLookWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        } else if (state.name === 'eat_left') {
            let posX = j * catLookWidth;
            let posY = 0;
            frames.loc.push({x: posX, y: posY})
        }
    }
    catActions[state.name] = frames;
})

let startTimer
let startTimerTwo
let startTimerThree

let alreadyComing = false
let stateLevel2 = 'onFloor'

function checkStepLevel2() {
    let combinedX = playerX + bX;
    let combinedY = playerY + bY;
    let hittingCar = hitCar(combinedX, combinedY);
    let hittingWoody = hitWoody(combinedX, combinedY);
    let hittingDish = hitDish(combinedX, combinedY);
    let hittingPacket = hitPacket(combinedX, combinedY)
    hideMouse(combinedX, combinedY);
    if (combinedY >= 810 && combinedX <= 725) {
        behindTable = true
    } else {
        behindTable = false
    }
    if (combinedY <= 400 && combinedY >= 358 && combinedX >=1200 && combinedX  <= 1230) {
        behindHouse = true
    } else {
        behindHouse = false
    }
    if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && druggedFood && catComing) {
        showMouse = false
        winLevelTwo = true
        levelTwoWin()
    }

    switch(stateLevel2) {
        case 'hitBell':
            stateLevel2 = 'onFloor'
            break
        case 'hitCar':
            if (!hittingCar) stateLevel2 = 'onFloor'
            break
        case 'hitWoody':
            if (!hittingWoody) stateLevel2 = 'onFloor'
            break
        case 'hitDish':
            if (!hittingDish) stateLevel2 = 'onFloor'
            break
        case 'hitPacket':
            if (!hittingPacket) stateLevel2 = 'onFloor'
            break
        case 'onFloor':
            if (!bellHitLeft && !bellHitRight && hitBell(combinedX, combinedY)) {
                stateLevel2 = 'hitBell'
                if (!dialogShowing){
                    appendtoDialog(toSayLevelTwo.bell[0].string)
                    toggleDialog()
                    sixteen = setTimeout(() => {
                        if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                        appendtoDialog(toSayLevelTwo.bell[1].string)
                    }, 1500)
                    seventeen = setTimeout(() => {
                        if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                        toggleDialog()
                    }, 3000)
                    let counter = 0;
                    startTimer = setInterval(() => {
                        if ((!showMouse || behindTable) && !alreadyComing) {
                            alreadyComing = true
                            lookForMouse()
                            clearInterval(startTimer)
                        } else if (counter > 8 && !alreadyComing) {
                            alreadyComing = true
                            getMouse()
                            clearInterval(startTimer)
                        }
                        counter += 1
                    }, 1000)
                    catX = bX - 200    
                    catComing = true
                }
            } else if (hittingCar && !letHitToyOnce) {
                stateLevel2 = 'hitCar'
                if (!dialogShowing) {
                    appendtoDialog(toSayLevelTwo.hitAToyOnce[0].string)
                    toggleDialog()
                    eighteen = setTimeout(() => {
                        while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                        toggleDialog()
                        letHitToyOnce = true
                    }, 1000)
                }
            } else if (hittingCar && letHitToyOnce) {
                stateLevel2 = 'hitCar'
                let counter = 0
                if (!dialogShowing) {
                    appendtoDialog(toSayLevelTwo.hitAToyTwice[0].string)
                    toggleDialog()
                    nineteen = setTimeout(() => {
                        while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                        toggleDialog()
                    }, 1000)
                    startTimerTwo = setInterval(() => {
                        if ((!showMouse || behindTable) && !alreadyComing) {
                            alreadyComing = true
                            lookForMouse()
                            clearInterval(startTimerTwo)
                        } else if (counter > 9 && !alreadyComing) {
                            alreadyComing = true
                            getMouse()
                            clearInterval(startTimerTwo)
                        }
                        counter += 1
                    }, 1000)
                    catX = bX - 200
                    catComing = true
                }
            } else if (hittingDish) {
                stateLevel2 = 'hitDish'
                if (gotPacket) {
                    if (!dialogShowing){
                        appendtoDialog(toSayLevelTwo.foodWithPacket[0].string)
                        toggleDialog()
                        twentyThree = setTimeout(() => {
                            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                            toggleDialog()
                        }, 3000)
                    }
                    druggedFood = true
                } else {
                    if (!dialogShowing){
                        appendtoDialog(toSayLevelTwo.foodNoPacket[0].string)
                        toggleDialog()
                        twentyTwo = setTimeout(() => {
                            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                            toggleDialog()
                        }, 2500)
 
                    }
                }
            } else if (hitPacket(combinedX, combinedY) && !gotPacket) {
                stateLevel2 = 'hitPacket'
                if (!dialogShowing){
                    appendtoDialog(toSayLevelTwo.packet[0].string)
                    toggleDialog()
                    twenty = setTimeout(() => {
                        if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                        }, 2500)
                    twentyOne = setTimeout(() => {
                        toggleDialog()
                    }, 2500)
                }
                gotPacket = true
            } else if (hittingWoody) {
                stateLevel2 = 'hitWoody'
                if (!druggedFood) {
                    if (!dialogShowing){
                        appendtoDialog(toSayLevelTwo.hide[0].string)
                        toggleDialog()

                        twentyFour = setTimeout(() => {
                            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                            appendtoDialog(toSayLevelTwo.hide[1].string)
                        }, 2500)
                        twentyFive = setTimeout(() => {
                            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                            toggleDialog()
                        }, 4000)
                    } 
                    let counter = 0;
                    startTimerThree = setInterval(() => {
                        if ((!showMouse || behindTable) && !alreadyComing) {
                            alreadyComing = true
                            lookForMouse()
                            clearInterval(startTimerThree)
                        } else if (counter > 8 && !alreadyComing) {
                            alreadyComing = true
                            getMouse()
                            clearInterval(startTimerThree)
                        }
                        counter += 1
                    }, 1000)
                    catX = bX - 200
                    catComing = true
                } else if (druggedFood) {
                    if (!dialogShowing){
                        appendtoDialog(toSayLevelTwo.hide[0].string)
                        toggleDialog()

                        twentySix = setTimeout(() => {
                            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                            appendtoDialog(toSayLevelTwo.hide[1].string)
                        }, 2500)
                        twentySeven = setTimeout(() => {
                            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                            toggleDialog()
                        }, 4000)
                        twentyEight = setTimeout(() => {
                            if (!showMouse) {
                                levelTwoWin()
                            } else {
                                getMouse()
                            }
                        }, 9000)
                    }
                    catX = bX - 200
                    catComing = true
                }
            }
        }
}

// function checkStepLevel2() {
 
//     let combinedX = playerX + bX;
//     let combinedY = playerY + bY;
//     // console.log(combinedX)
//     // console.log(combinedY)
//     if (!bellHitLeft && !bellHitRight) {
//         if (hitBell(combinedX, combinedY)) {
//             if (!dialogShowing){
//                 appendtoDialog(toSayLevelTwo.bell[0].string)
//                 toggleDialog()

//                 sixteen = setTimeout(() => {
//                     if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                     appendtoDialog(toSayLevelTwo.bell[1].string)
//                 }, 1500)
//                 seventeen = setTimeout(() => {
//                     if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                     toggleDialog()
//                 }, 3000)
//                 let counter = 0;
//                 startTimer = setInterval(() => {
                    
//                     if ((!showMouse || behindTable) && !alreadyComing) {
//                         alreadyComing = true
//                         lookForMouse()
//                         clearInterval(startTimer)
//                     } else if (counter > 8 && !alreadyComing) {
//                         alreadyComing = true
//                         getMouse()
//                         clearInterval(startTimer)
//                     }
//                     counter += 1
//                 }, 1000)
//             // intervals.push(startTimer)   
//             // timeOuts.push(sixteen, seventeen) 
//             catX = bX - 200    
//             catComing = true
//             } 
//         }
//     }

    

//     if (combinedY >= 810 && combinedX <= 725) {
//         behindTable = true
//     } else {
//         behindTable = false
//     }
//     if (combinedY <= 400 && combinedY >= 358 && combinedX >=1200 && combinedX  <= 1230 && druggedFood && !catComing) {
//         behindHouse = true
//     } else if (combinedY <= 400 && combinedY >= 358 && combinedX >=1200 && combinedX  <= 1230  && druggedFood && catComing) {
//         behindHouse = true
//     } else if (combinedY <= 400 && combinedY >= 358 && combinedX >=1200 && combinedX  <= 1230  && !druggedFood && catComing) {
//         behindHouse = true
//     } else {
//         behindHouse = false
//     }

//     if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380 && !druggedFood && !catComing) {
//         showMouse = false
//     } else if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && !druggedFood && catComing) {
//         showMouse = false
//     } else if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && druggedFood && !catComing) {
//         showMouse = false
//     } else if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && druggedFood && catComing) {
//         showMouse = false
//         winLevelTwo = true
//         levelTwoWin()
//     } else {
//         showMouse = true
//     }

//     let hittingCar = hitCar(combinedX, combinedY)
//     if (hittingCar && !letHitToyOnce && !alreadyHere) {
//         if (!dialogShowing) {
//             appendtoDialog(toSayLevelTwo.hitAToyOnce[0].string)
//             toggleDialog()
//             eighteen = setTimeout(() => {
//                 while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 toggleDialog()
//                 letHitToyOnce = true
//             }, 1000)
//             // timeOuts.push(eighteen)
//         }
//         alreadyHere = true
//     } else if (hittingCar && letHitToyOnce && !alreadyHere) {
//         let counter = 0
//         if (!dialogShowing) {
//             appendtoDialog(toSayLevelTwo.hitAToyTwice[0].string)
//             toggleDialog()
//             nineteen = setTimeout(() => {
//                 while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 toggleDialog()
//             }, 1000)
//             // timeOuts.push(nineteen)
//             startTimerTwo = setInterval(() => {
//             if ((!showMouse || behindTable) && !alreadyComing) {
//                 alreadyComing = true
//                 lookForMouse()
//                 clearInterval(startTimerTwo)
//             } else if (counter > 9 && !alreadyComing) {
//                 alreadyComing = true
//                 getMouse()
//                 clearInterval(startTimerTwo)
//             }
//             counter += 1
//         }, 1000)
//         // intervals.push(startTimerTwo)
//         catX = bX - 200
//         catComing = true
//     }
//     alreadyHere = true
//     } else if (hittingCar) {
//         alreadyHere = true
//     } else if (combinedY <= 300 && combinedY >= 232 && combinedX >=1325 && combinedX <= 1400 && !alreadyHere && !gotPacket) {
//         alreadyHere = true
//         if (!dialogShowing){
//             appendtoDialog(toSayLevelTwo.packet[0].string)
//             toggleDialog()
//             twenty = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 }, 2500)
//             twentyOne = setTimeout(() => {
//                 toggleDialog()
//             }, 2500)
//             // timeOuts.push(twenty, twentyOne)
//         }
//         gotPacket = true
//     } else if (combinedY >= 650 && combinedY <= 807 && combinedX <=1757 && combinedX >= 1635 && !alreadyHere && !gotPacket) {
//         alreadyHere = true
//         if (!dialogShowing){
//             appendtoDialog(toSayLevelTwo.foodNoPacket[0].string)
//             toggleDialog()

//             twentyTwo = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 toggleDialog()
//             }, 2500)
//             // timeOuts.push(twentyTwo)
//         }
//     } else if (combinedY >= 650 && combinedY <= 807 && combinedX <=1757 && combinedX >= 1635 && !alreadyHere && gotPacket && !druggedFood) {
//         alreadyHere = true
//         if (!dialogShowing){
//             appendtoDialog(toSayLevelTwo.foodWithPacket[0].string)
//             toggleDialog()

//             twentyThree = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 toggleDialog()
//             }, 3000)
//             // timeOuts.push(twentyThree)
//         }
//         druggedFood = true
//     } else if (combinedY >= 650 && combinedY <= 807 && combinedX <=1757 && combinedX >= 1635) {
//         alreadyHere = true
//     } else if (combinedY >= 585 && combinedY <= 630 && combinedX <=1503 && combinedX >= 1390 && !alreadyHere && !druggedFood) {
//         alreadyHere = true
//         if (!dialogShowing){
//             appendtoDialog(toSayLevelTwo.hide[0].string)
//             toggleDialog()

//             twentyFour = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 appendtoDialog(toSayLevelTwo.hide[1].string)
//             }, 2500)
//             twentyFive = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 // appendtoDialog(toSayLevelTwo.hide[1].string)
//                 toggleDialog()
//             }, 4000)
//             // timeOuts.push(twentyFour, twentyFive)
//         } 
//         let counter = 0;
//         startTimerThree = setInterval(() => {
//             if ((!showMouse || behindTable) && !alreadyComing) {
//                 alreadyComing = true
//                 lookForMouse()
//                 clearInterval(startTimerThree)
//             } else if (counter > 8 && !alreadyComing) {
//                 alreadyComing = true
//                 getMouse()
//                 clearInterval(startTimerThree)
//             }
//             counter += 1
//         }, 1000)
//         // intervals.push(startTimerThree)
//         catX = bX - 200
//         catComing = true
//     } else if (combinedY >= 585 && combinedY <= 630 && combinedX <=1503 && combinedX >= 1390 && !alreadyHere && druggedFood) {
//         alreadyHere = true
//         if (!dialogShowing){
//             appendtoDialog(toSayLevelTwo.hide[0].string)
//             toggleDialog()

//             twentySix = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 appendtoDialog(toSayLevelTwo.hide[1].string)
//             }, 2500)
//             twentySeven = setTimeout(() => {
//                 if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
//                 // appendtoDialog(toSayLevelTwo.hide[1].string)
//                 toggleDialog()
//             }, 4000)
//             twentyEight = setTimeout(() => {
//                 if (!showMouse) {
//                     levelTwoWin()
//                 } else {
//                     getMouse()
//                 }
//             }, 9000)
//             // timeOuts.push(twentySix, twentySeven, twentyEight)
//         }
//         catX = bX - 200
//         catComing = true
//     // } else if (playerY <= 248 && playerY >= 200 && playerX >=525) {
//     //     alreadyHere = true
//     } else if (combinedY >= 585 && combinedY <= 630 && combinedX <=1503 && combinedX >= 1390) {
//         alreadyHere = true
//     }else {
//        alreadyHere = false
//     }
// }

function movePlayerLevelTwo() {
    
    // console.log(playerX + bX)
    // console.log(playerY + bY)
    if (!dialogShowing && levelTwoRunning && !winLevelTwo){
        // checkStepLevel2()
        if(keys['ArrowUp']){
            if (bX < 700 && bY >= 450 && playerY >= 15 && !((playerY + bY + 11) >= tableH)) {
                playerY -= playerSpeed;
                playerState = 'up';
                checkStepLevel2()
                moving = true;
            } else if ((((bX + playerX + 25) > (dollhouseStopX)) && (bX + (playerX+25) < dollhouseStopW)) && ((((bY + playerY + 25) <= dollhouseStopH)) && ((bY + playerY + 25) >= dollhouseStopY))) {
                checkStepLevel2()
            } else if ((bX > 1200 && bY > 0 && ((bY + playerY) > 100)) || (playerX + bX > 1200 && bY > 0) && ((bY + playerY) > 120) && playerY < 250 ) {
                bY -= playerSpeed
                playerState = 'up';
                checkStepLevel2()
            } else if (((bX + playerX) < 1250) && (bY + playerY > 465)) {
                if (((playerX + bX + 5) >= tableW)) {
                    playerY -= playerSpeed;
                    playerState = 'up';
                    checkStepLevel2()
                    moving = true;
                }
            } else if (((bX + playerX) >= 1200) && ((bX + playerX) < 1300) && (bY > 0) && playerY < 250) {
                    bY -= playerSpeed;
                    playerState = 'up';
                    checkStepLevel2()
                    moving = true;
            } else if (((bX + playerX) >= 1200) && ((bY + playerY) > 120)) {
                
                    playerY -= playerSpeed;
                    playerState = 'up';
                    checkStepLevel2()
                    moving = true;
            }
            playerState = 'up';
        } else if (keys['ArrowDown']){
            if ((bX + playerX) >= 1635 && (bY + playerY) >= 650) {
                checkStepLevel2()
            } else if (playerY > (-((bY+playerHeight) - (tableY))) && playerX <= (-(bX - (tableW - 15)))) {
                
            } else if (bY < 450 && playerY > 50) {
                if ((((bX + playerX + 25) > (dollhouseStopX)) && (bX + (playerX+25) < dollhouseStopW)) && ((((bY + playerY +50) <= dollhouseStopH)) && ((bY + playerY + 50) >= dollhouseStopY))) {
                    checkStepLevel2()
                } else {
                    bY += playerSpeed;
                    playerState = 'down';
                    checkStepLevel2()
                }
            } else if (playerY < 360) {
                if ((((bX + playerX + 25) > (dollhouseStopX)) && (bX + (playerX+25) < dollhouseStopW)) && ((((bY + playerY +50) <= dollhouseStopH)) && ((bY + playerY + 50) >= dollhouseStopY))) {
                    checkStepLevel2()
                } else {
                    playerY += playerSpeed;
                    playerState = 'down';
                    moving = true;
                checkStepLevel2()
                }
            }
            playerState = 'down';
            moving = true;
        } else if (keys['ArrowLeft']){
             
            if (((bY + playerY) > 450) && bX > 350 && playerX < 50 && !catComing) {
                if ((playerX + bX) > tableW) {
                    bX -= playerSpeed
                    checkStepLevel2()
                    playerState = 'left';
                } else if (((playerX + bX) < tableW) && ((playerY + 25 + bY) < tableY) && !catComing) {
                    bX -= playerSpeed
                    checkStepLevel2()
                    playerState = 'left';
                } else if (((playerX + bX) < tableW) && ((playerY + bY + 11) >= tableH) && !catComing) {
                    bX -= playerSpeed
                    checkStepLevel2()
                    playerState = 'left';
                }
            } else if (((bY + playerY) > 450) && ((bX + playerX) > 350)) {
                if ((playerX + bX) > tableW) {
                    
                    if (((bX + playerX) <= dollhouseStopW) && !((bX + playerX) <= dollhouseStopX) && (((bY + playerY +30) > dollhouseStopY) && ((bY + playerY + 35) < dollhouseStopH))){
                        checkStepLevel2()
                    } else {
                        if (playerX >= 0) {
                            playerX -= playerSpeed
                            playerState = 'left';
                            checkStepLevel2()
                        }
                    }
                } else if (((playerX + bX) < tableW) && ((playerY + 25 + bY) < tableY)) {
                    if (playerX >= 0) {
                        playerX -= playerSpeed
                        playerState = 'left';
                        checkStepLevel2()
                    }
                } else if (((playerX + bX) < tableW) && ((playerY + bY + 11) >= tableH)) {
                    if (playerX >= 0) {
                        playerX -= playerSpeed
                        playerState = 'left';
                        checkStepLevel2()
                    }
                }
                moving = true;
            } else if (((bY + playerY) < 450) && ((bX + playerX) > 1200)) {
                playerX -= playerSpeed;
                playerState = 'left';
                checkStepLevel2()
                moving = true;
            }
           playerState = 'left';
        } else if (keys['ArrowRight']){
            if ((bX + playerX) >= 1635 && (bY + playerY) >= 650 && (bY + playerY) <= 807) {
                checkStepLevel2()
            } else if (bX <= 1200 && playerX > 400) {
                
                if (((bX + playerX + 50) >= dollhouseStopX) && ((bX + playerX + 25) <= dollhouseStopW) && (((bY + playerY +30) > dollhouseStopY) && ((bY + playerY + 35) < dollhouseStopH))) {
                    checkStepLevel2()
                } else{
                    checkStepLevel2()
                    bX += playerSpeed
                }
            } else if (playerX < 505) {
                if (((bX + playerX + 50) >= dollhouseStopX) && ((bX + playerX + 25) < dollhouseStopW) && (((bY + playerY +30) > dollhouseStopY) && ((bY + playerY + 35) < dollhouseStopH))) {
                    checkStepLevel2()
                } else{
                    checkStepLevel2()
                    playerX += playerSpeed
                }
            }
            playerState = 'right';
            // checkStepLevel2()
            moving = true;
        }
    }
}

let catComesOut

function lookForMouse() {
    if (!alreadyWon) {
        let combinedX = playerX + bX;
        let combinedY = playerY + bY;
        let startPlayerY = playerY
        let startbY = bY
        caughtInHeadlights = true
        catX = bX - 200;
        catY = 550;
        counter = 0
        catComesOut = setInterval(() => {
            if (counter === 150) {
                bY = startbY
                playerY = startPlayerY
                caughtInHeadlights = false
                alreadyComing = false
                catComing = false
                clearInterval(catComesOut)
            }
            if (bY < 450) {
                bY += 10
                playerY -= 10
            }
            if (counter < 35) {
                catX += catRunSpeed
                catState = 'run_right'
            } else if (counter < 55) {
                
                catState = 'look_right'
            } else if (counter < 75) {
            
                if (counter === 75) catX += 100
                catState = 'look_left'
            } else if (counter < 150) {
                catState = 'slow_left'
                catX -= catSlowSpeed
            }
            counter += 1
        }, 75)
        // intervals.push(catComesOut)
    }
}

let catComesOutGetMouse
let catComesOutGetMouseTwo
let catComesOutGetMouseThree

function getMouse() {
    let combinedX = playerX + bX;
    let combinedY = playerY + bY;
    caughtInHeadlights = true
    catX = bX - 200;
    catY = 550;
    if (showMouse && !behindTable) {
       
        if (combinedY < 450 || ( combinedY < 585 && combinedX > 1450)) {
            let hitEdge = false
            catComesOutGetMouse = setInterval(() => {
              
                if (catState === 'eat_left' || catState === 'eat_right') clearInterval(catComesOutGetMouse)
                if (!hitEdge) {
                    catState = 'run_right'
                    catX += catRunSpeed
                    if (bX < 1200) {
                        bX += 10
                        playerX -=10
                    }
                    if (catX >= 1445) {
                        hitEdge = true
                    }
                } else if (hitEdge && (catY - combinedY) < 100 && (catY - combinedY) > 0) {
                    if (bY > 0 && catY < 500) {
                        bY -= 10
                        playerY += 10
                    }
                    if (catX > 1650) {
                        catState = 'up_left'
                        catY -= 10
                    } else if ((catX + 50) > combinedX) {
                        catState = 'up'
                        catY -= 10
                    } else {
                        catState = 'run_right';
                        catX += catRunSpeed;
                        catY -= 10;
                    }
                    if ((catX - combinedX) <= 20 && (catY - combinedY) <= 20) {
                        if (catX > 1625) {
                            catX = 1625
                        }
                        catState = 'eat_right'
                        showMouse = false
                        sayWhenEaten()
                    }
                } else if (hitEdge && combinedX <= 1400 && catY < 300 && (catY - combinedY) < 10) {
                   if (bY > 0 && catY < 500) {
                        bY -= 10
                        playerY += 10
                    }
                    catState = 'run_left'
                    catX -= catRunSpeed
                    if ((catX - combinedX) <= 25) {
                        if (catX <= 1200) {
                            catX = 1200
                        }
                  
                        catState = 'eat_left'
                        showMouse = false
                        sayWhenEaten()
                    }
                } else if (catX >= 1445 && combinedX-50 >= catX && catX < 1650 && hitEdge) {
                    if (bY > 0 && catY < 500) {
                        bY -= 10
                        playerY += 10
                    }
                    catState = 'up_left'
                    catY -= catRunSpeed
                    catX += 10
                    if (catY <= combinedY && (combinedX -catX) < 20) {

                        catState = 'eat_right'
                        showMouse = false
                        sayWhenEaten()
                    }
                } else if (catX >=1445 && combinedX < catX && catX < 1650 && hitEdge) {
                    if (bY > 0 && catY < 500) {
                        bY -= 10
                        playerY += 10
                    }
                    catState = 'up'
                    catY -= catRunSpeed
                    catX -= 10
                    if (catY <= combinedY && (catX - combinedX) > 20) {
                        catState = 'eat_left'
                        showMouse = false
                        sayWhenEaten()
                    }
                } else if (hitEdge) {

                    if (bY > 0 && catY < 500) {
                        bY -= 10
                        playerY += 10
                    }
                    if (catX > combinedX){
                        catState = 'up'
                        catY -= catRunSpeed
                    } else {
                        catState = 'up_left'
                        catY -= catRunSpeed
                    }
                    if (catY <= combinedY) {
                        if (catX > combinedX && (catX - combinedX) < 40) {
                           
                            catState = 'eat_right'
                            showMouse = false
                            sayWhenEaten()
                        } else if (catX <= combinedX && (combinedX - catX) < 40) {
                            
                            catState = 'eat_right'
                            showMouse = false
                            sayWhenEaten()
                        }
                    }
                }
            }, 100);
            // intervals.push(catComesOutGetMouse)
        } else {
       
            const catComesOutGetMouseTwo = setInterval(() => {
                
                if (catState === 'eat_left' || catState === 'eat_right') clearInterval(catComesOutGetMouseTwo)
                if (catX + 100 < combinedX && (bX > tableW || (combinedY + 30) < tableY || combinedX > tableW + 250)) {
                    if (catX +110 >= combinedX && catY + 50 >= combinedY && catY - 50 <= combinedY) {
                        
                        catState = 'eat_right'
                        showMouse = false
                        sayWhenEaten()
                    } else if (catY + 40 > combinedY) {
                        
                        catState = 'run_right'
                        catX += catRunSpeed
                        catY -= 10
                    } else if ( catY + 50 < combinedY) {
                        
                        catState = 'run_right'
                        catX += catRunSpeed
                        if (catX > tableW) catY += 10
                    } else {
                        
                        catState = 'run_right'
                        catX += catRunSpeed
                    }
                } else{
                    if (catX < combinedX) {
                        catState = 'run_right'
                        catX += catRunSpeed
                    } else if (catY + catRunWidth - 50 < combinedY) {
                        catState = 'down'
                        catY += catRunSpeed
                    } else {
                        catState = 'eat_right'
                        showMouse = false
                        sayWhenEaten()
                    }
                }
            }, 75);
            // intervals.push(catComesOutGetMouseTwo)
        }
    } else if (behindHouse) {
        catComesOutGetMouseThree = setInterval(() => {
            if (catState === 'eat_left') clearInterval(catComesOutGetMouseThree)
            if (catX < 1200) {
                catState = 'run_right'
                catX += catRunSpeed
            } else if (catX >= 1200 && catY >= combinedY && catY <= 300) {
                if (bY > 0) {
                    bY -= 10
                }
                showMouse = false
                catState = 'up'
                catY += catRunSpeed
            } else {
                catState = 'eat_left'
                sayWhenEaten()
            }
        }, 75)
        // intervals.push(catComesOutGetMouseThree)
    }
}

let cars = [car1, car2, car3, car4, car5, car6]

function hitCar(combinedX, combinedY) {

    let detected = false
    cars.forEach((car) => {
        if (
            combinedX + 10 < car.x + car.width &&
            combinedX + 35 > car.x &&
            combinedY + 50 > car.y &&
            combinedY + 18 < car.y + car.height
            ) {
                detected = true
                
                if (playerState === 'up' || playerState === 'left') {
                  
                    car.x -= 10
                } else if (playerState === 'down' || playerState === 'right') {
                  
                    car.x += 10
                }
        }
    })

    return detected
}

function hitBell(combinedX, combinedY) {
 
    let detected = false
        if (
            combinedX < bellX + bellUpW &&
            combinedX + 30 > bellX &&
            combinedY + 30 > bellY &&
            combinedY < bellY + bellUpH
            ) {
              
                detected = true
                if (playerState === 'up' || playerState === 'left') {
                  
                    bellHitRight = true
                } else if (playerState === 'down' || playerState === 'right') {
                  
                    bellHitLeft = true
                }
        }
    return detected
}

function hitPacket(combinedX, combinedY) {

    let detected = false
        if (
            combinedX <= 1325 + 75 &&
            combinedX >= 1325 &&
            combinedY >= 232 &&
            combinedY <= 232 + 68
            ) {
                detected = true
        }
    return detected
}

function hitWoody(combinedX, combinedY) {
    let detected = false
        if (
            combinedX <= 1390 + 113 &&
            combinedX >= 1390 &&
            combinedY >= 585 &&
            combinedY <= 585 + 45
            ) {
                detected = true
        }
    return detected
}

function hitDish(combinedX, combinedY) {
    let detected = false
        if (
            combinedX <= 1635 + 122 &&
            combinedX >= 1635 &&
            combinedY >= 650 &&
            combinedY <= 650 + 157
            ) {
                detected = true
        }
    return detected
}

function hideMouse(combinedX, combinedY) {
    if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380 && !druggedFood && !catComing) {
        showMouse = false
    } else if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && !druggedFood && catComing) {
        showMouse = false
    } else if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && druggedFood && !catComing) {
        showMouse = false
    } else if (combinedY <= 470 && combinedY + 25 >= 364 && combinedX + 25 >=1272 && combinedX - 25 <= 1380  && druggedFood && catComing) {
        showMouse = false
        winLevelTwo = true
        levelTwoWin()
    } else {
        showMouse = true
    }
}

function sayWhenEaten() {
    if (!dialogShowing){
        if (!druggedFood) {
            appendtoDialog(toSayLevelTwo.onLose[0].string)
        } else {
            appendtoDialog(toSayLevelTwo.sorOfWon[0].string)
        }
        toggleDialog()

        twentyNine = setTimeout(() => {
            if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
            appendtoDialog(toSayLevelTwo.onLose[1].string)
        }, 7000)
        // timeOuts.push(twentyNine)
    }
}

let alreadyWon = false
let moveOver
let catComesOutLevelTwoWin
let runAway

function levelTwoWin() {
    
    let counterTwo = 0
    if (winLevelTwo && !alreadyWon) {
        alreadyWon = true
        moveOver = setInterval(() =>{
            if (bX >= 1200 && bY >= 450) clearInterval(moveOver)
            if (bX < 1200) {
                bX += 10
                playerX -= 10
            } else if (bY < 450) {
                bY += 10
                playerY -=10
            }
        }, 75)
        // intervals.push(moveOver)
        thirty = setTimeout(() =>{
            catComesOutLevelTwoWin = setInterval(() => {
                if (catState === 'eat_food') clearInterval(catComesOutLevelTwoWin)
                if (catX < 1400) {
                    catState = 'run_right'
                    catX += catRunSpeed
                    if (catY < 650) catY += 10
                } else if (catX >= 1400 && counterTwo < 69) {
                    catState = 'look_right'
                    catX += catLookSpeed
                    counterTwo += 1
                } else if (catX >=1400 && catX < 1550 && counterTwo >= 69) {
                    catState = 'slow_right'
                    catX += catSlowSpeed
                } else {
                    catState = 'eat_food'
                }
            }, 75);
            // intervals.push(catComesOutLevelTwoWin)
        }, 750)
        thirtyOne = setTimeout(() => {
            runAway = setInterval(()=> {
                if ((playerX + bX) >= 1575 && (playerY + bY) <= 120) {
                    clearInterval(runAway)
                    showMouse = false
                }
                if (bY > 0) {
                    bY -= 10
                    playerY += 10
                } 
                if ((playerX + bX) <= 1575 && bY <= 650) {
                    playerState = 'right'
                    playerX += (playerSpeed * 2)
                    if ((playerX + bX - 25) >= 1380) {
                        showMouse = true
                    }
                } else if ((playerY + bY) > 120) {
                    playerState = 'up'
                    playerY -= playerSpeed
                }
                
            }, 50)
            // intervals.push(runAway)
        }, 12000);
        thirtyTwo = setTimeout(() => {
            if (!dialogShowing){
            appendtoDialog(toSayLevelTwo.onWin[0].string)
            toggleDialog()

            thirtyThree = setTimeout(() => {
                if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                appendtoDialog(toSayLevelTwo.onWin[1].string)
            }, 7000)
            thirtyFour = setTimeout(() => {
                if (dialogShowing) while (dialog.firstChild) { dialog.removeChild(dialog.firstChild); }
                appendtoDialog(toSayLevelTwo.onWin[2].string)
            }, 16000)
            // timeOuts.push(thirtyThree, thirtyFour)
        }
        }, 18000)
        // timeOuts.push(thirty, thirtyOne, thirtyTwo)
    }
}

startAnimating(10);