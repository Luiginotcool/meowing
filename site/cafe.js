let bbox_data_array = [
  {
    "c1": {
      "x": 0.1452926583591497,
      "y": 0.8918980296873542
    },
    "c2": {
      "x": 0.24362203320827122,
      "y": 0.6218322140822775
    }
  },
  {
    "c1": {
      "x": 0.31700216369269024,
      "y": 0.8805507265106703
    },
    "c2": {
      "x": 0.41679914115150013,
      "y": 0.6150238321762672
    }
  },
  {
    "c1": {
      "x": 0.47110043770997023,
      "y": 0.87374234460466
    },
    "c2": {
      "x": 0.5694298125590918,
      "y": 0.6104849109055936
    }
  },
  {
    "c1": {
      "x": 0.6075874804109896,
      "y": 0.8601255807926393
    },
    "c2": {
      "x": 0.7059168552601112,
      "y": 0.5787124620108787
    }
  },
  {
    "c1": {
      "x": 0.7528801387701394,
      "y": 0.8964369509580278
    },
    "c2": {
      "x": 0.8688207449355214,
      "y": 0.6127543715409304
    }
  },
  {
    "c1": {
      "x": 0.23188121233076417,
      "y": 0.5015508004094282
    },
    "c2": {
      "x": 0.31993736891206703,
      "y": 0.24283228798103537
    }
  },
  {
    "c1": {
      "x": 0.3889146915674209,
      "y": 0.48339511532673396
    },
    "c2": {
      "x": 0.47697084814872376,
      "y": 0.2178682209923308
    }
  },
  {
    "c1": {
      "x": 0.5224665290490635,
      "y": 0.4788561940560604
    },
    "c2": {
      "x": 0.6134578908497431,
      "y": 0.22240714226300437
    }
  },
  {
    "c1": {
      "x": 0.658953571750083,
      "y": 0.4607005089733662
    },
    "c2": {
      "x": 0.751412536160451,
      "y": 0.23375444543968826
    }
  }
]

let plant_base_array = [
  {
    "x": 0.2009109874368418,
    "y": 0.805543118218161
  },
  {
    "x": 0.3737535280994189,
    "y": 0.7752769845802398
  },
  {
    "x": 0.5214821953323908,
    "y": 0.7785613934894346
  },
  {
    "x": 0.6588698558590548,
    "y": 0.7657081667618504
  },
  {
    "x": 0.8169395297983347,
    "y": 0.7926898914905768
  },
  {
    "x": 0.27625260772565746,
    "y": 0.3906339234723015
  },
  {
    "x": 0.431367708320278,
    "y": 0.37692747001713306
  },
  {
    "x": 0.5702326555192716,
    "y": 0.37692747001713306
  },
  {
    "x": 0.7090976027182652,
    "y": 0.3792118789263278
  }
]







class Coord {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class BoundingBox {
    c1;
    c2;
    static zero = new BoundingBox(new Coord(0, 0), new Coord(0, 0));

    constructor(c1, c2) {
        this.c1 = c1;
        this.c2 = c2;
    }

    toScreen() {
        return new BoundingBox(toScreenCoord(this.c1), toScreenCoord(this.c2));
    }

    normalise() {
        return new BoundingBox(normaliseCoord(this.c1), normaliseCoord(this.c2));
    }

    draw() {
        ctx.strokeRect(this.c1.x, this.c1.y, this.c2.x - this.c1.x, this.c2.y - this.c1.y);
    }

    containsPoint(coord) {
        let x = coord.x;
        let y = coord.y;
        let c1 = this.c1;
        let c2 = this.c2;
        if ((x > c1.x && x < c2.x) || (x > c2.x && x < c1.x)) {
            if ((y > c1.y && y < c2.y) || (y > c2.y && y < c1.y)) {
                return true;
            }
        }
        else {return false;}
    }
}



class Pot {
    id;
    bbox;
    has_seed;
    seed_type;
    grow_stage;
    plant_base_coord;
    static seed_types;
    static seed_names;

    constructor(bbox, plant_base_coord, id) {
        this.bbox = bbox;
        this.id = id;
        this.has_seed = false;
        this.seed_type = Seed.None;
        this.grow_stage = 0;
        this.plant_base_coord = plant_base_coord;
        Pot.seed_types = Seed.seeds;
    }

    static randomSeedType() {
        

        let distrib = Seed.seed_distribution;


        let total = 0;
        Seed.seeds.forEach((seed) => {
            total += distrib[seed.name];
        })

        Seed.seeds.forEach((seed) => {
            let v = distrib[seed.name];
            distrib[seed.name] = v / total;
        })

        let r = Math.random();
        let cm = 0;
        let randomSeed;
        let numSeeds = Seed.seeds.length;
        for (let i = 0; i < numSeeds; i++) {
            let seed = Seed.seeds[i];
            cm += distrib[seed.name];
            if (r <= cm) {
                return seed;
            }
        }
        


        return Pot.seed_types[r];
    }

    getSeedName(seed_type) {
        return seed_type.name;
    }

    getSeedId(seed_type) {
        return seed_type.id;
    }


    harvest() {
        this.has_seed = false;
        this.grow_stage = 0;
        console.log("You got some ", this.getSeedName(this.seed_type));
        player.plants[this.getSeedId(this.seed_type)] += 1;
    }

    clicked() {
        //console.log("Pot ", this.id, " was clicked!")
        console.log(player.cursorItem.name)
        if (this.grow_stage == 0) {
            if (player.cursorItem.name == "seed bag") {
                this.addSeed(Pot.randomSeedType());
            }
            //console.log("Added new seed to ", this.id, ": ", this.seed_type, ". ", this.grow_stage)
            return;
        } 
        if (player.cursorItem.name == "shears") {
            if (this.grow_stage > 3) {
                this.harvest();
            }
        }
        if (player.cursorItem.name == "milk can") {
            console.log("Milk can part ", this.grow_stage)
            if (this.seed_type.name == "mushroom") {
                if (this.grow_stage == 3) {
                    this.grow_stage = 4+Math.floor(Math.random()*3);
                    return;
                }
                if (this.grow_stage < 3) {
                    this.grow_stage += 1;
                }
                return;
            } 
            else {
                if (this.grow_stage < 4) {
                    console.log("Grow from ", this.grow_stage, this.grow_stage+1)
                    this.grow_stage += 1;
                }

            }
        }
        //console.log("Growth stage: ", this.grow_stage, this.id);
    }

    addSeed(seed_type) {
        //console.log("Add seed ", seed_type)
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
        player.seeds -= 1;
    }

    setSeed(seed_type) {
        //console.log("Set seed ", seed_type)
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
    }

    draw() {
        //console.log(this.grow_stage, this.plant_base_coord)
        let baseScreen = toScreenCoord(this.plant_base_coord);
        let scale = 1;
        if (this.grow_stage > 1) {
            let sprite = this.seed_type.getSprite(this.grow_stage);
            console.log(this)
            ctx.drawImage(sprite, baseScreen.x-(scale*sprite.width/2), baseScreen.y - (scale*sprite.height), 100*scale, 150*scale);
            console.log("Drawing at ", sprite, baseScreen.x-(scale*sprite.width/2), baseScreen.y - (scale*sprite.height), 100*scale, 150*scale)
            console.log(sprite.width, sprite.height)
        }
        
        if (this.grow_stage == 1) {
            ctx.fillStyle = "black"
            fillNormCircle(this.plant_base_coord, 5);
        }
    }
}

class Seed {
    name;
    id;
    filename;
    static seeds;
    static seed_distribution;
    static None = new Seed("none", "none", -1);

    constructor(name, filename, id) {
        this.name = name;
        this.id = id;
        this.filename = filename;
    }


    getSprite(grow_stage) {
        if (this.id == -1){
            return new Image();
        }
        let img = new Image();
        img = document.getElementById(`plants/${this.filename} growth stage ${grow_stage-1}.png`)

        console.log("Drawing sprite ", `../assets/plants/${this.filename} growth stage ${grow_stage-1}.png`)
        console.log(img)
        return img;
    }

    static fromName(seedName) {
        Seed.seeds.forEach((seed) => { 
            if (seed.name == seedName) { return seed; }
        })
    }
}

class Player {
    cursorState;
    seeds;
    plants;
    cursorItem;

    constructor() {
        this.seeds = 2;
        this.plants = new Array(Seed.seeds.length);
        this.plants.fill(0); 
        this.cursorItem = CursorItem.none;
        this.cursorState = cursorStates.empty;
    }

    handleCursorState() {

    }
}


class CursorItem {
    name;
    id;
    filename;
    animationStep;
    animated;
    bbox;
    grabPos;
    static cursorItem_array;
    static none = new CursorItem("none", "", BoundingBox.zero, false, new Coord(0,0), -1);
    constructor(name, filename, bbox, animated, grabPos, id) {
        this.name = name;
        this.filename = filename;
        this.bbox = bbox;
        this.id = id;
        this.animated = animated;
        this.animationStep = 1;
        this.grabPos = grabPos;
    }


    draw(x, y) {
        let img = this.getSprite();
        ctx.drawImage(img, x, y);
    }

    drawThumb(x, y, width, height) {
        let fn = `${this.filename} thumb.png`;
        let img = document.getElementById(fn);
        ctx.drawImage(img, x, y, width, height);
    }

    getSprite() {
        let fn;
        if (this.animated) {
            fn = `${this.filename} ${this.animationStep}.png`;
        } else {
            fn = `${this.filename}.png`;
        }
        return document.getElementById(fn);
    }

    clicked() {
        console.log("Click!")
        switch (player.cursorState) {
            case cursorStates.empty:
                player.cursorItem = this;
                player.cursorState = cursorStates.holdingItem;
                break;
            case cursorStates.holdingItem:
                if (player.cursorItem == this) {
                    player.cursorItem = CursorItem.none;
                    player.cursorState = cursorStates.empty;
                } 
                else {
                    player.cursorItem = this;
                    player.cursorState = cursorStates.holdingItem;
                }
                break;
        }
    }
}



const MAKE_BBOX = true;
const MAKE_POS_ARRAY = false;

let cursorItemPadding = 3;
let cursorItemGridPadding = 10;
let cursorItemWidth = 100;
let cursorItemHeight = 100;
let numCursorItems = 3;

let cursorItemBboxArray = []
for (let i = 0; i < numCursorItems; i++) {
    let x1 = cursorItemPadding + cursorItemGridPadding + (cursorItemWidth + cursorItemPadding)*i;
    let x2 = x1 + cursorItemWidth;
    let y1 = cursorItemGridPadding + cursorItemPadding - 5 ;
    let y2 = y1 + cursorItemHeight;
    let c1 = new Coord(x1, y1);
    let c2 = new Coord(x2, y2);
    cursorItemBboxArray.push(new BoundingBox(c1, c2));
}

console.log("cursor item bbox array", cursorItemBboxArray)
let pot1 = new Pot(bbox_data_array[0]);



let firstPos = [0,0];
let secondPos = [0,0];
let state = 0;
let boxes = [];

let bboxArray = [];
let posArray = [];

let ctx;
let canvas;
let infoText;
let mouseX = 0;
let mouseY = 0;
let normMouseCoord = new Coord(0, 0);


let player;


let boundingBoxStates = {
    noClick: 0,
    clickedOnce: 1,
    clickedTwice: 2
}

let cursorStates = {
    empty: 0,
    holdingItem: 1,
    usingItem: 2
}

potArray = [];




gamesetup();

function gamesetup() {
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    console.log(ctx);
    canvas.onclick = handleClick;
    canvas.onmousemove = handleMouseMove;
    console.log(bbox_data_array)

    infoText = document.getElementById("ui")

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



    player = new Player();


    // Create bounding box array
    bbox_data_array.forEach((bbox_data) => {
        let c1 = bbox_data.c1;
        let c2 = bbox_data.c2;
        bboxArray.push(new BoundingBox(c1, c2));
    }) 

    bboxArray.forEach((bbox, i) => {
        drawNormBbox(bbox);
        let pot = new Pot(bbox, plant_base_array[i], i);
        //console.log("PLANT BASE", pot)
        let r = Math.random();
        if (r < 0.2) {
            pot.setSeed(Pot.randomSeedType());
        }
        potArray.push(pot);
    })
    console.log(potArray);

    




    writeInfo(player);
    drawBackground();
    drawUI();
    window.requestAnimationFrame(gameloop);
}




function draw() {
    // Draw background
    // Draw Pots
    // Draw Cursor Items
    // Draw UI

    drawBackground();
    potArray.forEach((pot) => {
        pot.draw();
    });

    drawUI();
    
}


function drawUI() {
    // Get Images
    // Draw Cursor Items


    let cursorItemBackgroundWidth = (cursorItemWidth + cursorItemPadding)*(numCursorItems);

    // Draw Items Grid
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(cursorItemGridPadding, cursorItemGridPadding, cursorItemBackgroundWidth, 100)


    CursorItem.cursorItem_array.forEach((cursorItem) => {
        let corner = toScreenCoord(cursorItem.bbox.c1);    
        if(!(player.cursorItem == cursorItem)) {
            cursorItem.drawThumb(corner.x, corner.y, cursorItemWidth, cursorItemHeight);
        }
        cursorItem.bbox.toScreen().draw();
    })

    CursorItem.cursorItem_array.forEach((cursorItem) => {
        if (player.cursorItem == cursorItem) {

            switch (player.cursorState) {
                case cursorStates.holdingItem:
                    let screenMouseCoord = toScreenCoord(normMouseCoord);
                    cursorItem.draw(screenMouseCoord.x-cursorItem.grabPos.x, screenMouseCoord.y-cursorItem.grabPos.y)
                    break;
                case cursorStates.usingItem:
                    break;
                    
            }

        }
    })
 
}



function drawBackground() {
    let bgImg = new Image();
    bgImg.src = "../assets/meowing cat cafe.png";
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

function gameloop(timestamp) {


    draw();
    window.requestAnimationFrame(gameloop);
}



function writeInfo(player) {
    let infoString = 
    `Weed: ${player.weed} \nMushroom: ${player.mushroom} \nSeeds: ${player.seeds}`;

    infoString = "";
    Seed.seeds.forEach((seed_type, i) => {
        infoString+=`${seed_type.name}: ${player.plants[i]}\n`
    })
    infoString += `<br/> Debug: ${player.cursorItem.name == "shears"}   Item: ${player.cursorItem.name}`
    infoText.innerHTML = infoString
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
        state = handleBoundingBox(normalCoord, state);
    }
    if (MAKE_POS_ARRAY) {
        handlePosArray(normalCoord);
    }

    handlePots(normalCoord);
    handleCursorItem(normalCoord);

    drawUI();



    writeInfo(player);
}

function handleMouseMove(event) {
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


function normaliseCoord(coord) {
    let { width, height } = canvas.getBoundingClientRect();
    let x = coord.x / width;
    let y = coord.y / height;
    return new Coord(x, y);
}

function normaliseCoordScreen(coord) {
    let x = coord.x / canvas.width;
    let y = coord.y / canvas.height;
    return new Coord(x, y);
}

function toScreenCoord(coord) {
    let { width, height } = canvas.getBoundingClientRect();
    
    let x = coord.x * canvas.width;
    let y = coord.y * canvas.height;
    //console.log(width, height, coord)
    return new Coord(x, y);
}

function handlePosArray(coord) {
    posArray.push(coord);
    console.log(posArray);
}


function handleBoundingBox(coord, state) {
    let newState;

    switch (state) {
        case boundingBoxStates.noClick:
            firstPos = coord;
            newState = boundingBoxStates.clickedOnce;
            break;

        case boundingBoxStates.clickedOnce:
            secondPos = coord;
            let bb = new BoundingBox(firstPos, secondPos);
            boxes.push(bb);
            //console.log(boxes);
            newState = boundingBoxStates.noClick;
        default:
            break;
    }
    return newState;
}


function drawBbox(bbox) {
    drawRect(bbox.c1.x, bbox.c1.y, bbox.c2.x, bbox.c2.y);
}

function drawNormBbox(bbox_) {
    let bbox = bbox_.toScreen();

    drawRect(
        bbox.c1.x,
        bbox.c1.y,
        bbox.c2.x,
        bbox.c2.y,
    ); 
    
}

function drawRect(x1, y1, x2, y2) {
    if (!ctx) {console.log("No context"); return;}
    ctx.strokeRect(x1, y1, x2-x1, y2-y1);
}



function fillNormCircle(centre_, radius) {
    let centre = toScreenCoord(centre_);
    ctx.beginPath();
    ctx.arc(centre.x, centre.y, radius, 0, Math.PI * 2);
    ctx.fill();
}