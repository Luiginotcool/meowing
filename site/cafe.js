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

    constructor(c1, c2) {
        this.c1 = c1;
        this.c2 = c2;
    }

    toScreen() {
        return new BoundingBox(toScreenCoord(this.c1), toScreenCoord(this.c2));
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
        let r = Math.floor(Math.random() * Pot.seed_types.length);
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
        if (this.grow_stage == 0) {
            this.addSeed(Pot.randomSeedType());
            console.log("Added new seed to ", this.id, ": ", this.seed_type, ". ", this.grow_stage)
            return;
        } 
        else {
            if (this.grow_stage == 4) {
                this.harvest();
            }
            else {
                this.grow_stage+= 1;
            }
        }
        console.log("Growth stage: ", this.grow_stage, this.id);
    }

    addSeed(seed_type) {
        console.log("Add seed ", seed_type)
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
        player.seeds -= 1;
    }

    setSeed(seed_type) {
        console.log("Set seed ", seed_type)
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
    }

    draw() {
        //console.log(this.grow_stage, this.plant_base_coord)
        let baseScreen = toScreenCoord(this.plant_base_coord);
        let scale = 1.5;
        if (this.grow_stage > 1) {
            let sprite = this.seed_type.getSprite(this.grow_stage);
            ctx.drawImage(sprite, baseScreen.x-(scale*sprite.width/2), baseScreen.y - (scale*sprite.height), 100*scale, 150*scale);
        }
        
        switch (this.grow_stage) {
            case 0:
                break;
            case 1:
                fillNormCircle(this.plant_base_coord, 5);
                break;
            case 2:
                break;
            case 3:
                //ctx.fillRect(baseScreen.x-5, baseScreen.y, 5, -25);
                break;
        }
    }
}

class Seed {
    name;
    id;
    filename;
    static seeds;
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
        img.src = `../assets/plants/${this.filename} growth stage ${grow_stage-1}.png`;
        img = document.getElementById(`${this.filename} growth stage ${grow_stage-1}.png`)

        console.log("Drawing sprite ", `../assets/plants/${this.filename} growth stage ${grow_stage-1}.png`)
        console.log(img)
        return img;
    }
}

class Player {
    seeds;
    plants;

    constructor() {
        this.seeds = 2;
        this.plants = new Array(Seed.seeds.length);
        this.plants.fill(0); 
    }
}

const MAKE_BBOX = false;
const MAKE_POS_ARRAY = false;

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

let player;


let boundingBoxStates = {
    noClick: 0,
    clickedOnce: 1,
    clickedTwice: 2
}

potArray = [];




gamesetup();

function gamesetup() {
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    console.log(ctx);
    canvas.onclick = handleClick
    console.log(bbox_data_array)

    infoText = document.getElementById("ui")

    // new Seed(name, filename, id)
    Seed.seeds = [
        new Seed("tomato", "tomato", 0),
        new Seed("mushroom", "shroom", 1),
        new Seed("citridora", "citridora", 2)
    ];



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
    window.requestAnimationFrame(gameloop);
}


function drawBackground() {
    let bgImg = new Image();
    bgImg.src = "../assets/meowing cat cafe.png";
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

function gameloop(timestamp) {

    window.requestAnimationFrame(gameloop);
}



function writeInfo(player) {
    let infoString = 
    `Weed: ${player.weed} \nMushroom: ${player.mushroom} \nSeeds: ${player.seeds}`;

    infoString = "";
    Seed.seeds.forEach((seed_type, i) => {
        infoString+=`${seed_type.name}: ${player.plants[i]}\n`
    })
    infoText.innerHTML = infoString
}


function handleClick(event) {
    drawBackground();
    let x = event.offsetX;
    let y = event.offsetY;
    //console.log(x, y);

    let normalCoord = normaliseCoord(new Coord(x, y));
    //console.log(normalCoord);
    
    if (MAKE_BBOX) {
        state = handleBoundingBox(normalCoord, state);
    }
    if (MAKE_POS_ARRAY) {
        handlePosArray(normalCoord);
    }

    handlePots(normalCoord);

    writeInfo(player);
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


function normaliseCoord(coord) {
    let { width, height } = canvas.getBoundingClientRect();
    let x = coord.x / width;
    let y = coord.y / height;
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