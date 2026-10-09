class PlantItem {
    seed;
    type;
    name;
    bbox;

    static plantItem_array = [];

    constructor(seed, bbox) {
        this.type = "plant";
        this.seed = seed;
        this.name = seed.name;
        this.bbox = bbox;
    }

    getSprite() {
        return this.seed.getSprite("item");
    }

    draw(x, y) {
        let img = this.getSprite();
        ctx.drawImage(img, x, y);
    }

    grab() {
        player.heldItem = this;
        player.cursorState = cursorStates.holdingItem;
        player.plants[this.seed.id]--;
    }

    putBack() { // Currently holding a plant
        player.plants[player.heldItem.seed.id]++;
        player.heldItem = Item.none;
        player.cursorState = cursorStates.empty;
    }

    use() {
        if (player.plants[this.seed.id] == 0) {
            player.heldItem = Item.none;
            player.cursorState = cursorStates.empty;
        } else {
            player.plants[this.seed.id]--;
        }
    }

    clicked() {
        console.log("Plant item clicked!")
        switch (player.cursorState) {
            case cursorStates.empty:
                if (player.plants[this.seed.id] > 0) {
                    this.grab();
                }
                break;
            case cursorStates.holdingItem:

                if (player.heldItem == this) { // Putting back the thing you're holding
                    this.putBack();
                } 
                else {
                    if (player.heldItem.type == "plant") { // Clicking on another plant while holding one
                        if (player.plants[this.seed.id] > 0) {
                            this.putBack();
                            this.grab();
                        }
                    }
                    else { // Clicking on a plant while holding a tool
                        if (player.plants[this.seed.id] > 0) {
                            player.heldItem = Item.none;
                            player.cursorState = cursorStates.empty;
                            this.grab();
                        }
                    }
                }
                break;
        }
    }
}

class Item {
    type;
    name;
    static none = new Item("none");

    constructor(name) {
        this.type = "none";
        this.name = name;
    }
}