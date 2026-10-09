class Player {
    cursorState;
    seeds;
    plants;
    cursorItem;
    plantItem;
    heldItem;

    constructor() {
        this.seeds = 2;
        this.plants = new Array(Seed.seeds.length);
        this.plants.fill(0); 
        this.cursorItem = CursorItem.none;
        this.plantItem = null;
        this.heldItem = null;
        this.cursorState = cursorStates.empty;
    }

    handleCursorState() {

    }
}


let cursorStates = {
    empty: 0,
    holdingItem: 1,
    usingItem: 2
}
