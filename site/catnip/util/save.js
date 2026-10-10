


let saveData = {
    "player": JSON.parse(localStorage.getItem("player")),
    "potArray": JSON.parse(localStorage.getItem("potArray"))
}

localStorage.clear();

console.log("save data", saveData)


function saveGame(player, potArray) {
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("potArray", JSON.stringify(potArray));
    localStorage.setItem("time", JSON.stringify(new Date().getTime()))
    //saveData.obj = {"player": player, "potArray": pots};
    //saveData.time = new Date().getTime();   
    //localStorage.saveData = JSON.stringify(saveData);
}

function wipeSave() {
    localStorage.clear();
    saveData = {
        "player": null,
        "potArray": null
    }
}