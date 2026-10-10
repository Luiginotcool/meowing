const MAKE_BBOX = false;
const MAKE_POS_ARRAY = false;
const DRAW_SCENE_BOXES = false;







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


    Seed.seed_loot_table = {
        tomato: [3,5],
        mushroom: [1,2],
        citridora: [1,2],
        catmint: [1,3]
    }


    //
    //      Set up cursor items
    //

    toolItemBboxArray_norm = []
    toolItemBboxArray.forEach((bbox) => {
        toolItemBboxArray_norm.push(new BoundingBox(
            normaliseCoordScreen(bbox.c1),
            normaliseCoordScreen(bbox.c2)
        ));
    })

    // constructor(name, filename, bbox, animated, grabPos, id)
    ToolItem.toolItem_array = [
        new ToolItem(
            "milk can", "milk can", toolItemBboxArray_norm[0], true, new Coord(140, 45), 0
        ),
        new ToolItem(
            "seed bag", "seed bag", toolItemBboxArray_norm[1], true, new Coord(42, 30), 1
        ),
        new ToolItem(
            "shears", "shears", toolItemBboxArray_norm[2], false, new Coord(80, 65), 2
        )
    ]

    Seed.seeds.forEach((seed, i) => {
        PlantItem.plantItem_array.push(new PlantItem(seed, counterImageBboxArray[i]));
    })




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
    // Load player data
    //

    player = saveData.player || new Player();
    if (saveData.potArray) {
        potArrayData = saveData.potArray;
        potArray = potArrayDataToArray(potArrayData);
    }


    

    //saveGame(player, potArray);


    
    //debugCheat();


    window.requestAnimationFrame(gameloop);
}




function debugCheat() {
    Seed.seeds.forEach((seed, i) => {
        player.plants[i] = 25;
    })
}

let saveTick = 0;

function gameloop(timestamp) {
    draw();
    //writeInfo(player);
    if (saveTick > 600) {
        saveGame(player, potArray);
        saveTick = 0;
    }
}



function handleClick(event) {

    drawBackground();
    let x = event.offsetX;
    let y = event.offsetY;
    //console.log(x, y);

    let normalCoord = normaliseCoord(new Coord(x, y));
    let eventCoord = new Coord(x, y);
    let screenCoord = toScreenCoord(normalCoord);
    //console.log(normalCoord);
    
    if (MAKE_BBOX) {
        boundingBoxState = handleBoundingBox(normalCoord, boundingBoxState);
        console.log(boxes);
    }
    if (MAKE_POS_ARRAY) {
        handlePosArray(normalCoord);
    }

    handlePots(normalCoord);
    handleToolItem(normalCoord);
    handlePlantItem(screenCoord);
    handleScreens(normalCoord);

    drawUI();
    writeInfo(player);

    
}

function handlePlantItem(coord) {
    PlantItem.plantItem_array.forEach((plantItem) => {
        if (plantItem.bbox.containsPoint(coord)) {
            plantItem.clicked();
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

function handleToolItem(coord) {
    ToolItem.toolItem_array.forEach((toolItem) => {
        if (toolItem.bbox.containsPoint(coord)) {
            toolItem.clicked();
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


