


class Pot {
    id;
    bbox;
    has_seed;
    seed_type;
    grow_stage;
    plant_base_coord;
    static seed_types;
    static seed_names;

    constructor(bbox, plant_base_coord, id) {
        this.bbox = bbox;
        this.id = id;
        this.has_seed = false;
        this.seed_type = Seed.None;
        this.grow_stage = 0;
        this.plant_base_coord = plant_base_coord;
        Pot.seed_types = Seed.seeds;
    }

    static randomSeedType() {
        

        let distrib = Seed.seed_distribution;


        let total = 0;
        Seed.seeds.forEach((seed) => {
            total += distrib[seed.name];
        })

        Seed.seeds.forEach((seed) => {
            let v = distrib[seed.name];
            distrib[seed.name] = v / total;
        })

        let r = Math.random();
        let cm = 0;
        let randomSeed;
        let numSeeds = Seed.seeds.length;
        for (let i = 0; i < numSeeds; i++) {
            let seed = Seed.seeds[i];
            cm += distrib[seed.name];
            if (r <= cm) {
                return seed;
            }
        }
        


        return Pot.seed_types[r];
    }

    getSeedName(seed_type) {
        return seed_type.name;
    }

    getSeedId(seed_type) {
        return seed_type.id;
    }


    harvest() {
        this.has_seed = false;
        this.grow_stage = 0;
        console.log("You got some ", this.getSeedName(this.seed_type));
        player.plants[this.getSeedId(this.seed_type)] += 1;
    }

    clicked() {
        //console.log("Pot ", this.id, " was clicked!")
        console.log(player.cursorItem.name)
        if (this.grow_stage == 0) {
            if (player.cursorItem.name == "seed bag") {
                this.addSeed(Pot.randomSeedType());
            }
            //console.log("Added new seed to ", this.id, ": ", this.seed_type, ". ", this.grow_stage)
            return;
        } 
        if (player.cursorItem.name == "shears") {
            if (this.grow_stage > 3) {
                this.harvest();
            }
        }
        if (player.cursorItem.name == "milk can") {
            console.log("Milk can part ", this.grow_stage)
            if (this.seed_type.name == "mushroom") {
                if (this.grow_stage == 3) {
                    this.grow_stage = 4+Math.floor(Math.random()*3);
                    return;
                }
                if (this.grow_stage < 3) {
                    this.grow_stage += 1;
                }
                return;
            } 
            else {
                if (this.grow_stage < 4) {
                    console.log("Grow from ", this.grow_stage, this.grow_stage+1)
                    this.grow_stage += 1;
                }

            }
        }
        //console.log("Growth stage: ", this.grow_stage, this.id);
    }

    addSeed(seed_type) {
        //console.log("Add seed ", seed_type)
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
        player.seeds -= 1;
    }

    setSeed(seed_type) {
        //console.log("Set seed ", seed_type)
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
    }

    draw() {
        //console.log(this.grow_stage, this.plant_base_coord)
        let baseScreen = toScreenCoord(this.plant_base_coord);
        let scale = 1;
        if (this.grow_stage > 1) {
            let sprite = this.seed_type.getSprite(this.grow_stage);
            console.log(this)
            ctx.drawImage(sprite, baseScreen.x-(scale*sprite.width/2), baseScreen.y - (scale*sprite.height), 100*scale, 150*scale);
            console.log("Drawing at ", sprite, baseScreen.x-(scale*sprite.width/2), baseScreen.y - (scale*sprite.height), 100*scale, 150*scale)
            console.log(sprite.width, sprite.height)
        }
        
        if (this.grow_stage == 1) {
            ctx.fillStyle = "black"
            fillNormCircle(this.plant_base_coord, 5);
        }
    }
}

class Seed {
    name;
    id;
    filename;
    static seeds;
    static seed_distribution;
    static None = new Seed("none", "none", -1);

    constructor(name, filename, id) {
        this.name = name;
        this.id = id;
        this.filename = filename;
    }


    getSprite(grow_stage) {
        if (this.id == -1){
            return new Image();
        }
        let img = new Image();
        if (grow_stage = "item") {
            img = document.getElementById(`plants/${this.filename} item.png`);
            return img;
        }
        img = document.getElementById(`plants/${this.filename} growth stage ${grow_stage-1}.png`)

        console.log("Drawing sprite ", `../assets/plants/${this.filename} growth stage ${grow_stage-1}.png`)
        console.log(img)
        return img;
    }

    static fromName(seedName) {
        Seed.seeds.forEach((seed) => { 
            if (seed.name == seedName) { return seed; }
        })
    }
}