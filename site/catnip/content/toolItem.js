class ToolItem {
    name;
    id;
    filename;
    animationStep;
    animated;
    bbox;
    grabPos;
    type;
    static toolItem_array;
    static none = new ToolItem("none", "", BoundingBox.zero, false, new Coord(0,0), -1);
    constructor(name, filename, bbox, animated, grabPos, id) {
        this.type = "tool";
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

    grab() {
        player.heldItem = this;
        player.cursorState = cursorStates.holdingItem;
    }

    putBack() {
        player.heldItem = Item.none;
        player.cursorState = cursorStates.empty;
    }

    clicked() {
        console.log("Click!")
        switch (player.cursorState) {
            case cursorStates.empty:
                this.grab();
                break;
            case cursorStates.holdingItem:
                if (player.heldItem == this) {
                    this.putBack();
                } 
                else {
                    if (player.heldItem.type == "plant") {
                        player.heldItem.putBack();
                    }
                    this.grab();
                }
                break;
        }
    }
}
