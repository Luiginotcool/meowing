console.log("Hellow")
console.log("Copyright © 2026 Meowing Band")
let rand = Math.random()
let percent = 0.05;
let filename = rand < percent ? "scary.png" : "meowing.jpg";
let image = document.getElementById("image");
image.src=filename
if (rand < percent) {
    window.alert("Your brain has been infected by a virus. I will remove it")
}

function meow() {
    image.src = "scary.png"
}