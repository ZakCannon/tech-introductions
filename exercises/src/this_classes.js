const zoo = {
    cash: 1000,
    spend: function (amount) {
        if (this.cash < amount) {
            throw "Not enough money!";
        }
        this.cash -= amount;
        console.log(`Remaining funds: ${this.cash}`);
    }
};

class Animal {
    constructor(name, species, preferredFood, icon) {
        this.name = name
        this.species = species
        this.preferredFood = preferredFood
        this.hunger = 50
        this.icon = icon
    }
    toString() {
        return `${this.icon} ${this.name} the ${this.species}`
    }
    say(text) {
        console.log(`${this.icon} ${this.name}: ${text}`)
    }
    feed(food, cost=300) {
        if (this.preferredFood.includes(food)) {
            zoo.spend(cost)
            this.hunger = this.hunger - 10
            console.log(`fed ${this}, hunger is now ${this.hunger}`)
            this.say(`yummy! delicious ${food} 😋`)
        } else {
            this.say("yuck! 😣")
        }
    }

}
class Herbivore extends Animal {
    constructor() {
        super(...arguments);
    }
    feed(food, cost=200) {
        super.feed(food, cost)
    }
}

class Carnivore extends Animal {
    constructor() {
        super(...arguments);
    }
    feed(food, cost=500) {
        super.feed(food, cost)
    }
}

class Zebra extends Herbivore {
    constructor(name, preferredFood) {
        super(name, "zebra", preferredFood, "🦓");
    }
}

class Lion extends Carnivore {
    constructor(name, preferredFood) {
        super(name, "lion", preferredFood, "🦁");
    }
}

const alex = new Lion("alex", ["gazelle"])
const marty = new Zebra("marty", ["grass"])

marty.feed("grass")
alex.feed("deer")