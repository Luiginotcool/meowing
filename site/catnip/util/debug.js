let infoText;


function writeInfo(player) {
    let infoString = 
    `Weed: ${player.weed} \nMushroom: ${player.mushroom} \nSeeds: ${player.seeds}`;

    infoString = "";
    Seed.seeds.forEach((seed_type, i) => {
        infoString+=`${seed_type.name}: ${player.plants[i]}\n`
    })
    infoString += `<br/> Item type: ${player.heldItem.type}     \t Item: ${player.heldItem.name}`
    infoText.innerHTML = infoString
}
