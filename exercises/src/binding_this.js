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

const animal = {
    init: function (name, species, preferredFood, icon) {
        this.name = name
        this.species = species
        this.preferredFood = preferredFood
        this.hunger = 50
        this.icon = icon
        console.log(`Hello ${this}`)
        return this
    },
    feed: function (food, cost=300) {
        if (this.preferredFood.includes(food)) {
            zoo.spend(cost)
            this.hunger = this.hunger - 10
            console.log(`fed ${this}, hunger is now ${this.hunger}`)
            this.say(`yummy! delicious ${food} 😋`)
        } else {
            this.say("yuck! 😣")
        }
    },
    toString: function () {
        return `${this.icon} ${this.name} the ${this.species}`
    },
    say: function (text) {
        console.log(`${this.icon} ${this.name}: ${text}`)
    }
};

const carnivore = Object.create(animal)
carnivore.feedCarnivore = function (food) {
    this.feed(food, 500)
}

const herbivore = Object.create(animal)
herbivore.feedHerbivore = function (food) {
    this.feed(food, 200)
}

const animalCreator = {
    createAnimal: function(name, speciesName, animalType, preferredFoods, icon) {
        return Object.create(animalType).init(name, speciesName, preferredFoods, icon);
    },
    createZebra: function (name) {
        return this.createAnimal(name, "zebra", herbivore, ["grass"], "🦓")
    },
    createLion: function (name) {
        return this.createAnimal(name, "lion", carnivore, ["gazelle"], "🦁")
    },
    createGiraffe: function (name) {
        return this.createAnimal(name, "lion", herbivore, ["leaves"], "🦒")
    },
    createHippo: function (name) {
        return this.createAnimal(name, "lion", animal, ["moss", "carcasses"], "🦛")
    },
};

const zebraButton = {
    onClick: animalCreator.createZebra.bind(animalCreator)
}

const lionButton = {
    onClick: animalCreator.createLion.bind(animalCreator)
}

function getButton(index) {
    const buttons = [Object.create(zebraButton), Object.create(lionButton), Object.create(zebraButton)]
    return buttons[index];
}

const theZebraButton = getButton(0);
const bobTheZebra = theZebraButton.onClick('Bob');

bobTheZebra.feedHerbivore("grass");

const theOtherZebraButton = getButton(2);
const aliceTheZebra = theOtherZebraButton.onClick('Alice');

aliceTheZebra.feedHerbivore("grass");
bobTheZebra.feedHerbivore("grass");
bobTheZebra.feedHerbivore("grass");