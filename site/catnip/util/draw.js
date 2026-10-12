

function draw() {
    // Draw background
    // Draw Pots
    // Draw Cursor Items
    // Draw UI
    drawBackground();
    //console.log(Screen.currentScreen.name)
    switch (Screen.currentScreen.name) {
        case "garden":
        case "nightgarden":
            potArray.forEach((pot) => {
                pot.draw();
            });
            drawUI();
            break;
    }

    if (Screen.currentScreen.internetPage) {
        //drawInternet();
    }



    if (DRAW_SCENE_BOXES) {
        drawScreenBoxes();
    }
    if (MAKE_BBOX) {
        if (boundingBoxState == boundingBoxStates.clickedOnce) {
            let screenMouseCoord = toScreenCoord(normMouseCoord);
            let firstPosScreen = firstPos;
            ctx.strokeRect(firstPosScreen.x, firstPosScreen.y, screenMouseCoord.x - firstPosScreen.x, screenMouseCoord.y - firstPosScreen.y);
        }
        boxes.forEach((box) => {
            ctx.strokeRect(box[0],box[1],box[2]-box[0],box[3]-box[1]);
        })
    }
}


function drawInternet() {


    // Draw Page
    // Draw Header
    
    drawPageHeader();
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


function drawScreenBoxesOld() {
    destinationDict = screenTransitionBboxDictionary[currentScreenName]
    if (!destinationDict) {return;}
    Object.keys(destinationDict).forEach((to) => {
        destinationDict[to].forEach((bbox) => {
            bbox.toScreen().draw();
        })
    }) 
}

function drawScreenBoxes() {
    let navLinks = Screen.currentScreen.navLinks;
    //console.log(navLinks)
    navLinks.forEach((navLink, i) => {
        let destId = navLink.dest;
        let clickBoxId = navLink.clickBox;
        let clickBox = clickBoxLookup[ScreenGraph.clickBoxName(clickBoxId)];
        //console.log(navLink, clickBoxId)
        ctx.strokeRect(clickBox[0], clickBox[1], clickBox[2]-clickBox[0], clickBox[3]-clickBox[1])
    })
}


function drawBackground() {
    //let bgImg = new Image();
    //bgImg.src = `../assets/${currentScreen}`;
    //console.log(Screen.currentScreen.filename)
    
    let bgImg = document.getElementById(Screen.currentScreen.filename);
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}
