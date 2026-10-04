let rand = Math.random()
let probability = 1/75;
let scaryHTML = `
<html>
    <head>
        <title>Meowing</title>
    </head>
    <body id="body">
        <img src="../assets/scary.png" id="image" style="width:100%; height:100%;"/>
    </body>
</html>
`

console.log(rand, probability)

function swapPage() {
    if (rand < probability) {
        document.body.innerHTML = scaryHTML;
    }
}

swapPage();