

function draw() {
    // Draw background
    // Draw Pots
    // Draw Cursor Items
    // Draw UI
    drawBackground();

    switch (currentScreenName) {
        case "garden":
        case "nightgarden":
            potArray.forEach((pot) => {
                pot.draw();
            });
            drawUI();
            break;
    }


    
}


function drawUI() {
    // Get Images
    // Draw Cursor Items


    let cursorItemBackgroundWidth = (cursorItemWidth + cursorItemPadding)*(numCursorItems) - cursorItemPadding;

    //      Draw Items Grid
    ctx.fillStyle = "rgba(0.5, 0.5, 0.5, 0.5)";
    ctx.fillRect(cursorItemGridPadding, cursorItemGridPadding, cursorItemBackgroundWidth, 100);

    //      Draw Image Counters Grid
    ctx.fillStyle = "rgba(0.5, 0.5, 0.5, 0.25)";
    ctx.fillRect(
        counterImageCorner.x, 
        counterImageCorner.y, 
        2*counterImagePadding + counterImageWidth + 24, 
        4*counterImagePadding + counterImageHeight*numCounterImages
    );
    ctx.strokeRect(counterImageCorner.x, 
        counterImageCorner.y, 
        2*counterImagePadding + counterImageWidth + 24, 
        4*counterImagePadding + counterImageHeight*numCounterImages)



    //      Draw Cursor Items
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


    //      Draw Counter Images
    Seed.seeds.forEach((seed, i) => {
        let bbox = counterImageBboxArray[i];
        let {x, y} = bbox.c1;
        let sprite = seed.getSprite("item");
        ctx.drawImage(sprite, x, y, counterImageWidth, counterImageHeight);
    })

    //      Draw Counter counters

    Seed.seeds.forEach((seed, i) => {
        let bbox = counterImageBboxArray[i];
        let {x, y} = bbox.c1;
        textX = x + counterImageWidth*0.8;
        textY = y + counterImageHeight*0.8;
        ctx.font = "30px pixel";
        ctx.fillStyle = "#000000"
        ctx.fillText(`${player.plants[i]}`, textX, textY)
        console.log(`${player.plants[i]}`)
    })

 
}



function drawBackground() {
    let bgImg = new Image();
    bgImg.src = `../assets/${currentScreen}`;
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}
