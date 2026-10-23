

function screensSetup() {
    milkroadSetup();
}

function handleScreensLogic(click) {
    screenMilkroadLogic(click);
}

function handleScreensDraw() {
    screenMilkroadDraw();
}


function isMilkroadPage(screenName) {
    if (screenName.slice(0,4)=="milk") {
        return true;
    }
    else {
        return false;
    }
}


const milkroadBuyItems = [
    "citridora",
    "mushroom",
    "coffee",
]

const milkroadBuyItemPrices = {
    "citridora": 200,
    "mushroom": 70,
    "coffee": 25
}

const milkroadBuyItemPackSizes = {
    "citridora": 30,
    "mushroom": 70,
    "coffee": 21,
}

const milkroadSellItemPrices = {
    tomato: 1,
    mushroom: 10,
    citridora: 15,
    catmint: 5,
    coffee: 2
}

let milkroadCart = {}

let milkroadSellItems = []
let milkroadSellBox = {}

function getMilkroadPagetype(name) {
    return name.slice(4).replace(/[0-9]/g, '');
}


function screenMilkroadLogic(click) {
    if (!isMilkroadPage(Screen.currentScreen.name)) {
        return;
    }
    let pageType = getMilkroadPagetype(Screen.currentScreen.name);

    if (pageType == "buy") {
        milkroadBuyBoxData.forEach((box, i) => {
            if (BoundingBox.contains(box, click)) {
                let boughtItem = milkroadBuyItems[i];
                let price = milkroadBuyItemPrices[boughtItem];
                if (milkroadGetCartPrice(milkroadCart)+price > player.money) {
                    return;
                }
                if (!milkroadCart[boughtItem]>0) {
                    milkroadCart[boughtItem] = 1;
                } else {
                    milkroadCart[boughtItem]++;
                }
            }
        })

        if (BoundingBox.contains(milkroadClearButton, click)) {
            milkroadCart = {};
        }

        if (BoundingBox.contains(milkroadBuyButton, click)) {
            if (milkroadGetCartPrice(milkroadCart) <= player.money) {
                player.money -= milkroadGetCartPrice(milkroadCart);
                Object.keys(milkroadCart).forEach((item) => {
                    let id = Seed.fromName(item).id;
                    player.plants[id] += milkroadCart[item]*milkroadBuyItemPackSizes[item];
                })
                milkroadCart = {};
            }
        }
    }
    else if (pageType == "sell") {
        milkroadSellItems.forEach((sellItem) => {
            if (BoundingBox.contains(sellItem.bbox, click)) {
                sellItem.clicked();
            }
        })

        if (BoundingBox.contains(milkroadSellBoxBbox, click)) {
            if (player.heldItem.type == "plant") {
                if (!milkroadSellBox[player.heldItem.name]>0) {
                    milkroadSellBox[player.heldItem.name] = 1;
                } else {
                    milkroadSellBox[player.heldItem.name] ++;
                }
                player.heldItem.use();
            }
        }

        if (BoundingBox.contains(milkroadSellButton, click)) {
            let value = milkroadGetSellBoxPrice(milkroadSellBox);
            milkroadSellBox = {};
            player.money += value;
        }
    }



    

}

function milkroadGetCartPrice(cart) {
    let sum  = 0;
    Object.keys(cart).forEach((item) => {
        let price = milkroadBuyItemPrices[item];
        sum += price*cart[item];
    })
    return sum;
}

function milkroadGetSellBoxPrice(sellBox) {
    let sum  = 0;
    Object.keys(sellBox).forEach((item) => {
        let price = milkroadSellItemPrices[item];
        sum += price*sellBox[item];
    })
    return sum;
}





function milkroadSetup() {
    Seed.seeds.forEach((seed, i) => {
        let xi = i%8;
        let yi = (i-xi)/8;
        let x1 = milkroadSellItemGridCorners[0] + (milkroadSellItemGridPadding + milkroadSellItemGridWidth)*xi;
        let y1 = milkroadSellItemGridCorners[1] + (milkroadSellItemGridPadding + milkroadSellItemGridHeight)*yi;
        let bbox = []
        milkroadSellItems.push(new PlantItem(seed, [x1,y1,x1+milkroadSellItemGridWidth,y1+milkroadSellItemGridHeight]));
    });
    console.log(milkroadSellItems);
}




const milkroadClearButton = [200, 321, 0, 409];
const milkroadBuyButton = [200, 664, 0, 786];
const milkroadSellButton = [33, 655, 380, 782];


const milkroadSellItemGridCorners = [100, 285, 970, 435];
const milkroadSellItemGridWidth =  95;
const milkroadSellItemGridHeight = 70;
const milkroadSellItemGridPadding = 15;
const milkroadSellItemGridNumber = 8;


const milkroadBasketCorner = {"x": 0, "y": 400};
const milkroadBasketPadding = 10;
const milkroadBasketSpacing = 5;
const milkroadBasketCellHeight = 30;


const milkroadSellBoxBbox = [42, 454, 390, 645];

const milkroadSellAskingPricePos = {x:820,y:522};
const milkroadSellGoingPricePos = {x:850,y:480};



function screenMilkroadDraw() {

    if (!isMilkroadPage(Screen.currentScreen.name)) {
        return;
    }
    let pageType = getMilkroadPagetype(Screen.currentScreen.name);


    let moneyUICorner = {x:505, y:58};
    let moneyUIPadding = 5

    ctx.fillText(`${player.money}`, moneyUICorner.x + moneyUIPadding, moneyUICorner.y + moneyUIPadding)


    if (pageType == "buy") {
        let corner = milkroadBasketCorner;
        let padding = milkroadBasketPadding;
        let spacing = milkroadBasketSpacing;
        let height = milkroadBasketCellHeight;

        // Draw basket text
        ctx.fillStyle = "black"
        Object.keys(milkroadCart).forEach((item, i) => {
            let textX = corner.x + padding;
            let textY = corner.y + padding + (height + spacing)*i;
            ctx.fillText(`${item}:\t${milkroadCart[item]}`, textX, textY)
        })

        ctx.fillText(`${milkroadGetCartPrice(milkroadCart)}`, 80, 720)
    } 

    else if (pageType == "sell") {

        //      Draw item grid boxes

        ctx.fillStyle = "rgba(136,172,22,1)"
        for (let i = 0; i < milkroadSellItemGridNumber; i++) {
            let x = milkroadSellItemGridCorners[0] + (milkroadSellItemGridPadding + milkroadSellItemGridWidth)*i;
            let y = milkroadSellItemGridCorners[1];
            ctx.fillRect(x, y, milkroadSellItemGridWidth, milkroadSellItemGridHeight);
            ctx.strokeRect(x, y, milkroadSellItemGridWidth, milkroadSellItemGridHeight);
            y = milkroadSellItemGridCorners[1] + milkroadSellItemGridHeight + milkroadSellItemGridPadding;
            ctx.fillRect(x, y, milkroadSellItemGridWidth, milkroadSellItemGridHeight);
            ctx.strokeRect(x, y, milkroadSellItemGridWidth, milkroadSellItemGridHeight);
        }
        ctx.fillStyle = "black";

        //      Draw item grid items

        Seed.seeds.forEach((seed, i) => {
            let sprite = seed.getSprite("item");
            let x = i%8;
            let y = (i-x)/8;
            let imgx = milkroadSellItemGridCorners[0] + (milkroadSellItemGridPadding + milkroadSellItemGridWidth)*x;
            let imgy = milkroadSellItemGridCorners[1] + (milkroadSellItemGridPadding + milkroadSellItemGridHeight)*y;
            ctx.drawImage(sprite, imgx+17, imgy+5);
            if ((player.heldItem.name == seed.name)) {
                let mouseCoord = toScreenCoord(normMouseCoord);
                ctx.drawImage(sprite, mouseCoord.x - 25, mouseCoord.y - 25)
            }
            textX = imgx + milkroadSellItemGridWidth*0.7;
            textY = imgy + milkroadSellItemGridWidth*0.7;
            ctx.font = "30px pixel";
            ctx.fillStyle = "#000000"
            ctx.fillText(`${player.plants[i]}`, textX, textY);
        })

        //      Draw going price

        ctx.fillText(`${milkroadGetSellBoxPrice(milkroadSellBox)}`, milkroadSellGoingPricePos.x, milkroadSellGoingPricePos.y)
    }


}