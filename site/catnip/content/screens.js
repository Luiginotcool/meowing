let screens = {
    "garden": "laptop draft5.png",
    "nightgarden": "meowing cat cafe night.png",
    "askfloppa": "askbigfloppa.png",
    "moonshot": "moonshot.png"
}

let names = {}
Object.keys(screens).forEach((name) => {
    names[screens[name]] = name;
})

let currentScreen = screens.garden;
let currentScreenName = names[currentScreen]

function changeScreen(to) {
    currentScreen = screens[to];
    currentScreenName = names[currentScreen];
}