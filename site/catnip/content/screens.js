class Screen {
    name;
    filename;
    id;
    internetPage;
    navLinks = []; //[{Screen, clickBox}]
    static screenArray = [];
    static currentScreen;

    constructor(name, filename, id, internetPage, navLinks=[]) {
        this.name = name;
        this.filename = filename;
        this.id = id;
        this.internetPage = internetPage;
        if (this.navLinks.length > 0) {
            this.navLinks = navLinks;
        }
    }

    addNavLink(dest, clickBox) {
        this.navLinks.push({dest, clickBox});
    }

    static navigate(navLink) {
        this.currentScreen = this.screenArray[navLink.dest]
    }

    static navLinkContains(navLink, point) {
        //console.log(navLink, point, clickBoxLookup)
        let clickBoxId = navLink.clickBox;
        let clickBox = ScreenGraph.clickBoxValues(clickBoxId);
        //let clickBox = clickBoxLookup[internetClickBoxIds[clickBoxId]];
        return BoundingBox.contains(clickBox, point);
    }

    static getScreen(name) {
        let gotscreen;
        Screen.screenArray.forEach((screen) => {
            if (screen.name == name) {
                gotscreen = screen;
            }
        })
        return gotscreen;
    }
}


class ScreenGraph {
    adjList; // [[ScreenId, ScreenId....], ...]
    size;
    static screenIdLookup = {};
    static screenNameLookup = [];
    static clickBoxIdLookup = {};
    static clickBoxNameLookup = [];

    constructor(numScreens) {
        this.size = numScreens;
        this.adjList = [];
        for (let i = 0; i < numScreens*2; i++) {
            this.adjList.push([]);
        }
    }

    addNavigation(sourceId, destId, clickBoxId) {
        this.adjList[sourceId].push({destId, clickBoxId});
    }

    print() {
        this.adjList.forEach((children, i) => {
            if (children.length == 0) {return}
            let childrenNames = children.map((child) => {return ScreenGraph.screenNameLookup[child.destId];});
            let string = ScreenGraph.screenNameLookup[i] + "  |   " + childrenNames.join(" ");
            console.log(string);
        })
    }

    static setup(screenIds, clickBoxIds) {
        this.screenNameLookup = screenIds;
        screenIds.forEach((screenId, i) => {
            this.screenIdLookup[screenId] = i;
        });
        this.clickBoxNameLookup = clickBoxIds;
        clickBoxIds.forEach((clickBoxId, i) => {
            this.clickBoxIdLookup[clickBoxId] = i;
        });
    }


    static fromCsvString(greenString, blueString, gameGraphString) {

        let navBarPages = ["home", "wiki", "paint"]

        // Green + Red Graph (tree and back)
        let lines = greenString.split("\n");
        let graph = new ScreenGraph(lines.length);
        lines.forEach((line) => {
            if(!line) { return}
            let data = line.split(",").map((str)=>{return str.trim();});
            // data: [source, destination, clickbox]
            let [source, destination, clickbox] = data;
            graph.addNavigation(this.screenId(source), this.screenId(destination), this.clickBoxId(clickbox));
            graph.addNavigation(this.screenId(destination), this.screenId(source), this.clickBoxId("back_"));

        })

        internetScreenIds.forEach((source) => {
            graph.addNavigation(this.screenId(source), this.screenId("home"), this.clickBoxId("home_"));
            graph.addNavigation(this.screenId(source), this.screenId("wiki"), this.clickBoxId("wiki_"));
            graph.addNavigation(this.screenId(source), this.screenId("paint"), this.clickBoxId("paint_"));
            graph.addNavigation(this.screenId(source), this.screenId("garden"), this.clickBoxId("exit_"));
        })

        navBarPages.forEach((source) => {
            graph.addNavigation(this.screenId(source), this.screenId("home"), this.clickBoxId("back_"));
            graph.addNavigation(this.screenId(source), this.screenId("home"), this.clickBoxId("home_"));
            graph.addNavigation(this.screenId(source), this.screenId("wiki"), this.clickBoxId("wiki_"));
            graph.addNavigation(this.screenId(source), this.screenId("paint"), this.clickBoxId("paint_"));
            graph.addNavigation(this.screenId(source), this.screenId("garden"), this.clickBoxId("exit_"));
        })

        lines = blueString.split("\n");
        lines.forEach((line) => {
            if(!line) { return}
            let data = line.split(",").map((str)=>{return str.trim();});
            // data: [source, destination, clickbox]

            let [source, destination, clickbox] = data;
            graph.addNavigation(this.screenId(source), this.screenId(destination), this.clickBoxId(clickbox));
        })

        
        lines = gameGraphString.split("\n");
        lines.forEach((line) => {
            if(!line) { return}
            let data = line.split(",").map((str)=>{return str.trim();});
            // data: [source, destination, clickbox]
            let [source, destination, clickbox] = data;
            //console.log(source, destination, clickbox)
            graph.addNavigation(this.screenId(source), this.screenId(destination), this.clickBoxId(clickbox));
        })

        



        return graph;
    }

    static screenId(name) {
        return this.screenIdLookup[name];
    }

    static clickBoxId(name) {
        return this.clickBoxIdLookup[name];
    }

    static screenName(id) {
        return this.screenNameLookup[id];
    }

    static clickBoxName(id) {
        return this.clickBoxNameLookup[id];
    }

    static clickBoxValues(id) {
        let name = ScreenGraph.clickBoxName(id);
        return clickBoxLookup[name];
    }
}





let clickBoxIds = Object.keys(clickBoxLookup)

ScreenGraph.setup(internetScreenIds.concat(gameScreenIds), clickBoxIds);



let graph = ScreenGraph.fromCsvString(internetGraphString, internetGraphExtraString, gameGraphString);
//graph.print();
console.log(graph);

internetScreenIds.forEach((screenId, i) => {
    Screen.screenArray.push(new Screen(screenId, `${screenId}.png`, i, true));
})

gameScreenIds.forEach((screenId, i) => {
    Screen.screenArray.push(new Screen(screenId, gameScreenFilenames[i], internetScreenIds.length + i, false));
})

// this.adjList[sourceId].push({destId, clickBoxId});
/*
[
    [{destId, ClickboxId}, {destId, ClickboxId}],
    [{destId, ClickboxId}],
    [],
    [{destId, ClickboxId}],
]

*/
graph.adjList.forEach((navLinkArray, i) => {
    let sourceId = i;
    let screen = Screen.screenArray[i];
    if (!screen) {return}
    navLinkArray.forEach((navLink) => {
        screen.addNavLink(navLink.destId, navLink.clickBoxId);
    })
})



console.log(Screen.screenArray)

//  console.log(Screen.screenArray);




/*
addNavigation("askfloppa", "bet36meow", "askfloppa_bet36meow")


    --  Initial Green Links (Tree)

Source, Destination, clickBox

askfloppa, bet36meow, askfloppa_bet36meow
askfloppa, milkroad, askfloppa_milkroad
askfloppa, meowtube, askfloppa_meowtube


bet36meow, betgolf, bet36_golf,
bet36meow, betflapjack, bet36_flapjack,
bet36meow, betbingo, bet36_bingo

milkroad, milkbuy, milkroad_buy
milkbuy, milkbuy2, milkbuy_2
milkbuy2, milkbuy3, milkbuy_3
milkroad, milksell, milkroad_sell

meowtube, meowvids1, meowtube_videos1
meowvids1, meowvids2, meowvids_2
meowvids1, meowclip1, meowclip_1
meowvids1, meowclip2, meowclip_2
meowvids1, meowclip3, meowclip_3
meowvids1, meowclip4, meowclip_4
meowvids1, meowclip5, meowclip_5
meowvids2, meowclip1, meowclip_1
meowvids2, meowclip2, meowclip_2
meowvids2, meowclip3, meowclip_3
meowvids2, meowclip4, meowclip_4
meowvids2, meowclip5, meowclip_5





*/










Screen.currentScreen = Screen.getScreen("garden");