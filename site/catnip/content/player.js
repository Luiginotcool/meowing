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

