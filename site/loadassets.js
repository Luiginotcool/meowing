let assetsContainer = document.getElementById("image_container");
console.log("assets container", assetsContainer);


assetsArray = []
filenamesArray = [
    "meowing cat cafe.png"
]

plantnamesArray = [
    "shroom",
    "tomato",
    "citridora"
]

plantnamesArray.forEach((plantName) => {
    for (let i = 1; i <= 3; i++) {
        filenamesArray.push(`${plantName} growth stage ${i}.png`)
    }
});


let containerHTML = ""
filenamesArray.forEach((fileName) => {
    containerHTML += `<img src="../assets/plants/${fileName}" id="${fileName}"/>`;
})

assetsContainer.innerHTML = containerHTML;