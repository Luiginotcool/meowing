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
