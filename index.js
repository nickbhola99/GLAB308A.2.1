//Part 1 Humble Beginnings
// const adventurer = {
// name: "Robin",
// health: 10,
// inventory: ["sword", "potion", "artifact"],
// companion: {
//     name: "Leo",
//     type: "Cat",
//     companion:{
//         name: "Frank",
//         type: "Flea",
//         inventory: ["small hat", "sunglasses"]
//     }
// },
// roll(mod = 0){
//     const result = Math.floor(Math.random() * 20) + 1 + mod;
//     console.log(`${this.name} rolled a ${result}.`);

// }
// }
// adventurer.roll()

//Part 2 Class Fantasy
class Character {
  static MAX_HEALTH = 100;
  constructor(name) {
    this.name = name;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }

  get getH() {
    return MAX_HEALTH;
  }
}
//added Antagonist and Monster classes for Part 7, Monsters have less health than Adventurers but do more damage in duels
class Antagonist {
  static MAX_HEALTH = 50;
  constructor(name) {
    this.name = name;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }

  get getH() {
    return MAX_HEALTH;
  }
}

// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];
// console.log(robin.companion);

// robin.roll()

//Part 3 Class Features
class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];
  constructor(name, role) {
    super(name);
    try {
      if (!Adventurer.ROLES.includes(role)) {
        throw "Role Not Included";
      }
    } catch (error) {
      console.log(error);
      return;
    }
    this.role = role;
    this.health = Character.MAX_HEALTH;
    this.inventory.push("bedroll", "50 gold coins");
  }
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  duel(enemy) {
    while (this.health > 1 && enemy.health > 1) {
      let player1 = super.roll();
      let player2 = enemy.roll();
      console.log(this.health + " " + enemy.health);

      let key = player1 < player2;
      switch (key) {
        case true:
          if (enemy.constructor.name == "Adventurer") {
            this.health -= 1;
          }
          if (enemy.constructor.name == "Monster") {
            this.health -= 2;
          }
          break;
        case false:
          if (enemy.constructor.name == "Adventurer") {
            enemy.health -= 1;
          }
          if (enemy.constructor.name == "Monster") {
            enemy.health -= 1;
          }
          break;
      }
    }
    console.log(`${this.health} ${enemy.health}`);
    if (this.health > enemy.health) {
      return "Victory for " + this.name;
    } else {
      return "Victory for " + enemy.name;
    }
  }
}

class Companion extends Character {
  constructor(name, role) {
    super(name);
    this.role = role;
    this.inventory.push("bedroll", "50 gold coins");
  }
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}

class Monster extends Antagonist {
  static ROLES = ["Vampire", "Orc", "Goblin"];
  constructor(name, role) {
    super(name);
    try {
      if (!Monster.ROLES.includes(role)) {
        throw "Role Not Included";
      }
    } catch (error) {
      console.log(error);
      return;
    }
    this.role = role;
    this.health = Antagonist.MAX_HEALTH;
    this.inventory.push("Claws", "Dark Soul");
  }
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  duel(enemy) {
    while (this.health > 1 && enemy.health > 1) {
      let player1 = super.roll();
      let player2 = enemy.roll();
      console.log(this.health + " " + enemy.health);

      let key = player1 < player2;
      switch (key) {
        case true:
          this.health -= 1;
          break;
        case false:
          if (enemy.constructor.name == "Adventurer") {
            enemy.health -= 2;
          }
          if (enemy.constructor.name == "Monster") {
            enemy.health -= 1;
          }
          break;
      }
    }
    console.log(`${this.health} ${enemy.health}`);
    if (this.health > enemy.health) {
      return "Victory for " + this.name;
    } else {
      return "Victory for " + enemy.name;
    }
  }
}

//Part 5
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

// const robin = new Adventurer("robin", "warrior");
const Robin = new Adventurer("Robin", "Fighter");
console.log(Robin);
Robin.companion = new Companion("Leo", "Cat");
console.log(Robin.companion);

Robin.companion.companion = new Companion("Frank", "Flea");
Robin.companion.companion.inventory = ["small hat", "sunglasses"];
const Jeff = new Adventurer("Jeff", "Wizard");
const Green = new Adventurer("Green", "Wizard");
const Job = new Monster("Job", "Orc");
// console.log(Job.duel(Robin));
console.log(Green.duel(Robin));
console.log(Jeff.duel(Job));