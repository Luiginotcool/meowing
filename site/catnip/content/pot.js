


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

    getLoot() {
        let [min, max] = Seed.seed_loot_table[this.getSeedName()];
        let range = max - min;
        let r = min + Math.floor(Math.random() * (range));
        return r;
    }

    getSeedName() {
        return this.seed_type.name;
    }

    getSeedId() {
        return this.seed_type.id;
    }


    harvest() {
        this.has_seed = false;
        this.grow_stage = 0;
        let loot = this.getLoot();
        console.log(`You got ${loot} ${this.getSeedName(this.seed_type)}`);
        player.plants[this.getSeedId(this.seed_type)] += loot;
    }

    clicked() {
        if (this.grow_stage == 0) {
            if (player.heldItem.name == "seed bag") {
                this.addSeed(Pot.randomSeedType());
                return;
            }
            if (player.heldItem.type == "plant") {
                this.addSeed(player.heldItem.seed);
                player.heldItem.use();
            }
            return;
        } 
        if (player.heldItem.name == "shears") {
            if (this.grow_stage > 3) {
                this.harvest();
            }
        }
        if (player.heldItem.name == "milk can") {
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
                    this.grow_stage += 1;
                }

            }
        }
    }

    addSeed(seed_type) {
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
        player.seeds -= 1;
    }

    setSeed(seed_type) {
        this.seed_type = seed_type;
        this.grow_stage = 1;
        this.has_seed = true;
    }

    draw() {
        let baseScreen = toScreenCoord(this.plant_base_coord);
        let scale = 1;
        if (this.grow_stage > 1) {
            let sprite = this.seed_type.getSprite(this.grow_stage);
            ctx.drawImage(sprite, baseScreen.x-(scale*sprite.width/2), baseScreen.y - (scale*sprite.height), 100*scale, 150*scale);
        }
        
        if (this.grow_stage == 1) {
            ctx.fillStyle = "black"
            fillNormCircle(this.plant_base_coord, 5);
        }
    }

    static fromJson(json) {
        return Object.assign(new Pot(), json);
    }
}

class Seed {
    name;
    id;
    filename;
    static seeds;
    static seed_distribution;
    static seed_loot_table;
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
        if (grow_stage == "item") {
            img = document.getElementById(`plants/${this.filename} item.png`);
            return img;
        }
        img = document.getElementById(`plants/${this.filename} growth stage ${grow_stage-1}.png`)

        return img;
    }

    static fromName(seedName) {
        Seed.seeds.forEach((seed) => { 
            if (seed.name == seedName) { return seed; }
        })
    }

    static fromJson(json) {
        return Object.assign(new Seed(), json);
    }
}