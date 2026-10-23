





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

    canvas.onmousedown = handleClick;
    canvas.oncontextmenu = (e) => {e.preventDefault();}
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
        new Seed("coffee", "coffee", 4)
    ];

    Seed.seed_distribution = {
        tomato: 15,
        mushroom: 5,
        citridora: 10,
        catmint: 15,
        coffee: 100
    }


    Seed.seed_loot_table = {
        tomato: [3,3,4,4,5],
        mushroom: [1,1,1,2],
        citridora: [1,1,2],
        catmint: [1,1,2,2,3],
        coffee: [1,2,2]
    };


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
    // Check if new plants are undefined
    for (let i = 0; i < Seed.seeds.length; i++) {
        if (player.plants[i] == undefined) {
            player.plants[i] = 0;
        }
    }
    if (!player.money) {player.money = 0;}
    //console.log(player.plants)
    if (saveData.potArray) {
        potArrayData = saveData.potArray;
        potArray = potArrayDataToArray(potArrayData);
    }
    


    //      Setup screens
    screensSetup();


    

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
    saveTick++;
    if (saveTick > 60) {
        if (AUTOSAVE) {
            saveGame(player, potArray);
        }

        saveTick = 0;
        //console.log("Saving...")
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


    if (event.which == 3) { // right click
        if (MAKE_BBOX) {
            boundingBoxState = handleBoundingBox(screenCoord, boundingBoxState);
            if (boundingBoxState == boundingBoxStates.noClick) {
                let str = ""
                boxes.forEach((box) => {
                    str+=`[${box[0]}, ${box[1]}, ${box[2]}, ${box[3]}],\n`
                });
                console.log(str);
            }
        }
        if (MAKE_POS_ARRAY) {
            handlePosArray(normalCoord);
        }
    }
    


    if (event.which == 1) { // Left click
        handlePots(normalCoord);
        handleToolItem(normalCoord);
        handlePlantItem(screenCoord);
        handleScreens(screenCoord);
        handleScreensLogic(screenCoord);
        handleFullscreen(screenCoord);
        handleDebug(screenCoord);
    } 




    drawUI();
    //writeInfo(player);

    
}

function handleDebug(coord) {
    if (DRAW_DEBUG_POINTS) {
        debugPoints.push(coord);
    }
}

function handleFullscreen(coord) {
    console.log(App.isFullScreen)
    if (!ALLOW_FULLSCREEN || !BoundingBox.contains(fullscreenBox, coord)) {
        return;
    }
     //                      ---     DISABLE FULLSCREEN     ---
    if (!App.isFullScreen) {
        App.isFullScreen = true;
        setInfoText("Fullscreen enabled");
        gameContainer.requestFullscreen().catch((err) => {
            App.isFullScreen = false;
            setInfoText(`Error enabling fullscreen: ${err.message}`);
            console.error(`Error enabling fullscreen: ${err.message}`);
        })

    } else {
        App.isFullScreen = false; 
        setInfoText("Fullscreen disabled");
        document.exitFullscreen().catch((err) => {
            App.isFullScreen = true;
            setInfoText(`Error exiting fullscreen: ${err.message}`);
            console.error(`Error exiting fullscreen: ${err.message}`);
        });
 
    }

}

function handlePlantItem(coord) {
    if (Screen.currentScreen.name == "garden" || Screen.currentScreen.name == "nightgarden") {
        PlantItem.plantItem_array.forEach((plantItem) => {
            if (plantItem.bbox.containsPoint(coord)) {
                plantItem.clicked();
            }
        })
    }

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
    if (Screen.currentScreen.name == "garden" || Screen.currentScreen.name == "nightgarden") {
        potArray.forEach((pot) => {
            //console.log(coord, pot.bbox, pot.bbox.containsPoint(coord))
            if (pot.bbox.containsPoint(coord)) {
                pot.clicked();
            } 
            pot.draw();
        })
    }

}

function handleToolItem(coord) {
    if (Screen.currentScreen.name == "garden" || Screen.currentScreen.name == "nightgarden") {
        ToolItem.toolItem_array.forEach((toolItem) => {
            if (toolItem.bbox.containsPoint(coord)) {
                toolItem.clicked();
            }
        })
    }

}


function handleScreensOld(coord) {
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

function handleScreens(coord) {
    let navLinks = Screen.currentScreen.navLinks;
    navLinks.forEach((navLink, i) => {
        let destId = navLink.dest;
        let clickBoxId = navLink.clickBox;
        //console.log(`Destination: ${ScreenGraph.screenName(destId)},  Click box: ${ScreenGraph.clickBoxName(clickBoxId)}`)
        if (Screen.navLinkContains(navLink, coord)) {
            Screen.navigate(navLink);
        }
    })
}




Game = {}


Game.init = gamesetup;

Game.loop = gameloop;

Game.draw = draw;


