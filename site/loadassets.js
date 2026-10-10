let assetsContainer = document.getElementById("image_container");
console.log("assets container", assetsContainer);


assetsArray = []
filenamesArray = [
    "meowing cat cafe.png",
    "milk can 1.png",
    "milk can 2.png", 
    "milk can 3.png",
    "milk can thumb.png",
    "seed bag thumb.png",
    "seed bag 1.png",
    "seed bag 2.png",
    "shears.png",
    "shears thumb.png",
    "webpage header.png"
]





plantnamesArray = [
    "shroom",
    "tomato",
    "citridora",
    "catmint"
]


plantnamesArray.forEach((plantName) => {
    let numImages = 3;
    if (plantName == "shroom") {
        numImages = 5;
    }
    for (let i = 1; i <= numImages; i++) {
        filenamesArray.push(`plants/${plantName} growth stage ${i}.png`)
    }
    filenamesArray.push(`plants/${plantName} item.png`)
});

Object.keys(screens).forEach((screen) => {
    filenamesArray.push(screens[screen]);
})


let containerHTML = ""
filenamesArray.forEach((fileName) => {
    containerHTML += `<img src="../assets/${fileName}" id="${fileName}"/>`;
})

assetsContainer.innerHTML = containerHTML;