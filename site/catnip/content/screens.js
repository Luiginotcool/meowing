


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


let milkroadBuyItems = [
    "citridora",
    "mushroom",
    "coffee",
]

let milkroadBuyItemPrices = {
    "citridora": 200,
    "mushroom": 70,
    "coffee": 25
}

let milkroadBuyItemPackSizes = {
    "citridora": 30,
    "mushroom": 70,
    "coffee": 21,
}

let milkroadCart = {}


function screenMilkroadLogic(click) {
    if (!isMilkroadPage(Screen.currentScreen.name)) {
        return;
    }

    milkroadBuyBoxData.forEach((box, i) => {
        if (BoundingBox.contains(box, click)) {
            let boughtItem = milkroadBuyItems[i];
            let price = milkroadBuyItemPrices[boughtItem];
            if (milkroadGetCartPrice(milkroadCart)+price > player.money) {
                return;
            }
            console.log(`buying ${boughtItem}`)
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

    
    console.log(milkroadCart)
}

function milkroadGetCartPrice(cart) {
    let sum  = 0;
    Object.keys(cart).forEach((item) => {
        let price = milkroadBuyItemPrices[item];
        sum += price*cart[item];
    })
    return sum;
}





let milkroadClearButton = [200, 321, 0, 409];
let milkroadBuyButton = [200, 664, 0, 786];


const milkroadBasketCorner = {"x": 0, "y": 400};
const milkroadBasketPadding = 10;
const milkroadBasketSpacing = 5;
const milkroadBasketCellHeight = 30;

function screenMilkroadDraw() {

    if (!isMilkroadPage(Screen.currentScreen.name)) {
        return;
    }
    let pageType = Screen.currentScreen.name.slice(4)

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


}