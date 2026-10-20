


function handleScreensLogic(click) {

}



let milkroadBuyItems = [
    "citradora",
]


function screenMilkroadLogic(click) {
    if (Screen.currentScreenName != "milkroad") {
        return;
    }

    milkroadBuyBoxData.forEach((box, i) => {
        if (BoundingBox.contains(box, click)) {

        }
    })

}