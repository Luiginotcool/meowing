

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



    let toolItemBackgroundWidth = (toolItemWidth + toolItemPadding)*(numToolItems) - toolItemPadding;

    //      Draw Items Grid
    ctx.fillStyle = "rgba(0.5, 0.5, 0.5, 0.5)";
    ctx.fillRect(toolItemGridPadding, toolItemGridPadding, toolItemBackgroundWidth, 100);

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



    //      Draw Tool Items
    ToolItem.toolItem_array.forEach((toolItem) => {
        let corner = toScreenCoord(toolItem.bbox.c1);    
        if(!(player.heldItem == toolItem)) {
            toolItem.drawThumb(corner.x, corner.y, toolItemWidth, toolItemHeight);
        }
        toolItem.bbox.toScreen().draw();
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
        //console.log(`${player.plants[i]}`)
    })

    //      Draw Held item
    ToolItem.toolItem_array.forEach((toolItem) => {
        if (player.heldItem == toolItem) {
            switch (player.cursorState) {
                case cursorStates.holdingItem:
                    let screenMouseCoord = toScreenCoord(normMouseCoord);
                    toolItem.draw(screenMouseCoord.x-toolItem.grabPos.x, screenMouseCoord.y-toolItem.grabPos.y)
                    break;
                case cursorStates.usingItem:
                    break;
            }
        }
    })

    PlantItem.plantItem_array.forEach((plantItem) => {
        if (player.heldItem == plantItem) {
            let screenMouseCoord = toScreenCoord(normMouseCoord);
            plantItem.draw(screenMouseCoord.x - counterImageWidth/2, screenMouseCoord.y - counterImageHeight/2);
        }
    })



 
}



function drawBackground() {
    let bgImg = new Image();
    bgImg.src = `../assets/${currentScreen}`;
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}
