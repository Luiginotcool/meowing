class Player {
    cursorState;
    seeds;
    plants;
    heldItem;

    constructor() {
        this.seeds = 2;
        this.plants = new Array(Seed.seeds.length);
        this.plants.fill(0); 
        this.heldItem = Item.none;
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
