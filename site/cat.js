window.onload = main;

const ActualSpriteWidth = 400;
const ActualSpriteHeight = 200;
const SpritesInCol = 13;
const SpritesInRow = 4;
let SpriteWidth;
let SpriteHeight;
let SpritesheetWidth;
let ScaleFactor;
let frames = 0;
let animationElement;
const fps = 25;
let catPosX = 0;
let oldTime = 0;
let pageWidth;

function main() {
    animationElement = document.getElementById("cat-animation");
    [SpriteWidth, SpriteHeight, SpritesheetWidth, ScaleFactor] = setup();
    animationElement.style.width = `${SpriteWidth}px`
    animationElement.style.height = `${SpriteHeight}px`
    pageWidth = window.innerWidth;


    window.requestAnimationFrame(loop);


    //SetSprite(1, 5, animationElement);
    let i = 0;

    window.setInterval(() => {
        console.log("Frame: ", i)
        SetSprite(0, i, animationElement);
        i++;
        i=i%12;
    }, 1000/fps);
}

function setup() {
    // calculate sprite width/height
    // and spritesheet width
    let navHeight = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-height");
    let spriteHeight = navHeight - 5;
    let scalefactor = spriteHeight / ActualSpriteHeight;
    let spriteWidth = ActualSpriteWidth * scalefactor;
    let spritesheetWidth = spriteWidth * SpritesInRow;
    return [spriteWidth, spriteHeight, spritesheetWidth, scalefactor];
}

function setCatPosition(x, catElement) {
    catElement.style.left = `${x}px`;
}


function loop(timestamp) {

    let dt = timestamp - oldTime;
    let c = 4;
    let dx = (131+c)*ScaleFactor*fps*dt / 5000;
    catPosX += dx;
    if (catPosX > pageWidth+5) {
        catPosX = -2-SpriteWidth;
    }
    console.log(catPosX, "CAT POSITION")
    setCatPosition(catPosX, animationElement);
    console.log(ScaleFactor, fps, dt);

    frames++;
    oldTime = timestamp;
    window.requestAnimationFrame(loop);
}


function getSpritesheetCoordFromSpriteIndex(x, y, spriteWidth, spriteHeight) {
    return {x: -x*spriteWidth, y:-y*spriteHeight};
}

function SetSprite(x, y, animationElement) {
    if (!animationElement) {
        console.log("No animation element: ", animationElement)
        return false;
    }

    let sheetCoord = getSpritesheetCoordFromSpriteIndex(x, y, SpriteWidth, SpriteHeight);
    console.log(sheetCoord)
    //console.log(SpriteWidth, SpriteHeight, SpritesheetWidth)
    animationElement.style.backgroundPositionX = `${sheetCoord.x}px`;
    animationElement.style.backgroundPositionY = `${sheetCoord.y}px`;
    
}



`

in 5 frames the cat moves 131 pixels

speed = d/t = 131*sf / (5/fps)
 = 131*sf*fps / 5   pixels per second

total movement = 131*sf*fps*time / 5
`

