App = {}





App.init = function() {
    App.frames = 0;
    App.oldTimeStamp = 0;
    App.canvas = document.getElementById("game-canvas");
    App.width = window.innerWidth;
    App.height = window.innerHeight;
    App.isFullScreen = false;


    App.noLoop = false;
    App.drawBackground = false;



    Game.init();



    window.requestAnimationFrame(App.appLoop);
}

App.appLoop = function(timeStamp) {
    if (App.noLoop) {
        window.requestAnimationFrame(App.appLoop);
    } else {

        App.dt = (timeStamp - App.oldTimeStamp);
        App.oldTimeStamp = timeStamp;
        let fps = Math.round(1000 / App.dt);
        Game.loop()

        App.frames++;
        App.noLoop = false;
        window.requestAnimationFrame(App.appLoop);
    }
}


App.verbose = function(array) {
    array.forEach(node => {console.log(node)})
}

App.init();



let gameContainer = document.getElementById("main-body");
gameContainer.ondblclick = () => {
    return; //                      ---     DISABLE FULLSCREEN     ---
    if (!App.isFullScreen) {
        App.isFullScreen = true;
        gameContainer.requestFullscreen().catch((err) => {
            App.isFullScreen = false;
            console.error(`Error enabling fullscreen: ${err.message}`);
        })

    } else {
        App.fullscreen = false;  
        document.exitFullscreen().catch((err) => {
            App.isFullScreen = true;
            console.error(`Error enabling fullscreen: ${err.message}`);
        });
 
    }

}
