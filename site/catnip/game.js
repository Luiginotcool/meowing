const MAKE_BBOX = true;
const MAKE_POS_ARRAY = false;








let firstPos = [0,0];
let secondPos = [0,0];



let bboxArray = [];
let posArray = [];



let mouseX = 0;
let mouseY = 0;
let normMouseCoord = new Coord(0, 0);
let player;
let boxes = [];


let boundingBoxStates = {
    noClick: 0,
    clickedOnce: 1,
    clickedTwice: 2
}

potArray = [];



function gamesetup() {

    
    prepareData();

    //
    //      Set up canvas and HTML
    //

    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    console.log(ctx);
    canvas.onclick = handleClick;
    canvas.onmousemove = handleMouseMove;

    infoText = document.getElementById("ui")

    //
    //      Set up seed types and distribution
    //

    // new Seed(name, filename, id)
    Seed.seeds = [
        new Seed("tomato", "tomato", 0),
        new Seed("mushroom", "shroom", 1),
        new Seed("citridora", "citridora", 2),
        new Seed("catmint", "catmint", 3),
    ];

    Seed.seed_distribution = {
        tomato: 15,
        mushroom: 5,
        citridora: 10,
        catmint: 15,
    }


    //
    //      Set up cursor items
    //

    cursorItemBboxArray_norm = []
    cursorItemBboxArray.forEach((bbox) => {
        cursorItemBboxArray_norm.push(new BoundingBox(
            normaliseCoordScreen(bbox.c1),
            normaliseCoordScreen(bbox.c2)
        ));
    })

    // constructor(name, filename, bbox, animated, grabPos, id)
    CursorItem.cursorItem_array = [
        new CursorItem(
            "milk can", "milk can", cursorItemBboxArray_norm[0], true, new Coord(140, 45), 0
        ),
        new CursorItem(
            "seed bag", "seed bag", cursorItemBboxArray_norm[1], true, new Coord(42, 30), 1
        ),
        new CursorItem(
            "shears", "shears", cursorItemBboxArray_norm[2], false, new Coord(80, 65), 2
        )
    ]




    //
    //      Set up pots
    //

    plant_bbox_data_array.forEach((bbox_data) => {
        let c1 = bbox_data.c1;
        let c2 = bbox_data.c2;
        bboxArray.push(new BoundingBox(c1, c2));
    }) 

    bboxArray.forEach((bbox, i) => {
        let pot = new Pot(bbox, plant_base_array[i], i);
        let r = Math.random();
        if (r < 0.2) {
            pot.setSeed(Pot.randomSeedType());
        }
        potArray.push(pot);
    })


    // 
    // Create player
    //

    
    player = new Player();


    window.requestAnimationFrame(gameloop);
}



function gameloop(timestamp) {


    draw();
}



function handleClick(event) {

    drawBackground();
    let x = event.offsetX;
    let y = event.offsetY;
    //console.log(x, y);

    let normalCoord = normaliseCoord(new Coord(x, y));
    let coord = new Coord(x, y);
    //console.log(normalCoord);
    
    if (MAKE_BBOX) {
        boundingBoxState = handleBoundingBox(normalCoord, boundingBoxState);
        console.log(boxes);
    }
    if (MAKE_POS_ARRAY) {
        handlePosArray(normalCoord);
    }

    handlePots(normalCoord);
    handleCursorItem(normalCoord);
    handleScreens(normalCoord);

    drawUI();
    writeInfo(player);

    
}

function handlePlantItem(coord) {
    Seed.seeds.forEach((seed, i) => {
        let bbox = counterImageBboxArray[i]
        let coord = toScreenCoord(coord)
        if (bbox.containsPoint(coord)) {

        }
    })
}

function handleMouseMove(event) {
    //console.log(event)
    let x = event.offsetX;
    let y = event.offsetY;
    let normalCoord = normaliseCoord(new Coord(x, y));
    mouseX = normalCoord.x;
    mouseY = normalCoord.y;
    normMouseCoord = normalCoord;
}

function handlePots(coord) {
    potArray.forEach((pot) => {
        //console.log(coord, pot.bbox, pot.bbox.containsPoint(coord))
        if (pot.bbox.containsPoint(coord)) {
            pot.clicked();
        } 
        pot.draw();
    })
}

function handleCursorItem(coord) {
    CursorItem.cursorItem_array.forEach((cursorItem) => {
        if (cursorItem.bbox.containsPoint(coord)) {
            cursorItem.clicked();
        }
    })
}


function handleScreens(coord) {
    //console.log(screenTransitionBboxDictionary, currentScreenName)
    let destinationDict = screenTransitionBboxDictionary[currentScreenName];
    Object.keys(destinationDict).forEach((to) => {
        destinationDict[to].forEach((bbox) => {
            if (bbox.containsPoint(coord)) {
                changeScreen(to);
            }
        })
    })
}





Game = {}


Game.init = gamesetup;

Game.loop = gameloop;

Game.draw = draw;


