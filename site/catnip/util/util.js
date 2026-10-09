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
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black"
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

    static fromJson(json) {
        return Object.assign(new BoundingBox(), json);
    }
}

let ctx;
let canvas;

let boundingBoxState = 0;



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