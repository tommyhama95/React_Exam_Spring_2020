const pokemon = [
    {
        name: "Blastoise",
        type: ["Water"],
        amount: 0
    },    {
        name: "Charizard",
        type: ["Fire", "Flying"],
        amount: 0
    },    {
        name: "Venusaur",
        type: ["Grass", "Poison"],
        amount: 0
    },    {
        name: "Meganium",
        type: ["Grass"],
        amount: 0
    },    {
        name: "Typhlosion",
        type: ["Fire"],
        amount: 0
    },    {
        name: "Feraligatr",
        type: ["Water"],
        amount: 0
    },    {
        name: "Sceptile",
        type: ["Grass"],
        amount: 0
    },    {
        name: "Blaziken",
        type: ["Fire"],
        amount: 0
    },    {
        name: "Swampert",
        type: ["Water", "Ground"],
        amount: 0
    },    {
        name: "Torterra",
        type: ["Grass", "Ground"],
        amount: 0
    },    {
        name: "Infernape",
        type: ["Fire", "Fighting"],
        amount: 0
    },    {
        name: "Empoleon",
        type: ["Water", "Steel"],
        amount: 0
    },    {
        name: "Dragonite",
        type: ["Flying", "Dragon"],
        amount: 0
    },    {
        name: "Tyranitar",
        type: ["Rock", "Dark"],
        amount: 0
    },    {
        name: "Salamence",
        type: ["Flying", "Dragon"],
        amount: 0
    },    {
        name: "Metagross",
        type: ["Steel", "Psychic"],
        amount: 0
    },    {
        name: "Garchomp",
        type: ["Ground", "Dragon"],
        amount: 0
    },    {
        name: "Raikou",
        type: ["Electric"],
        amount: 0
    },    {
        name: "Entei",
        type: ["Fire"],
        amount: 0
    },    {
        name: "Suicune",
        type: ["Water"],
        amount: 0
    }
];

// For some pokeball is known to hold 1 pokemon, therefore it is also
// used in the code below.
function getPokemonCardItem() {
    const pokeCollection = [];

    for(let i = 0; i <= 2; i++) {
        const x = Math.floor(pokemon.length * Math.random());
        const pokeball = pokemon[x];
        pokeCollection.push(pokeball);
    };

    return pokeCollection;
}

function countPokemonAvailable() {
    return pokemon.length;
}

function getAllPokemon() {
    return pokemon;
}

module.exports = {getPokemonCardItem, pokemon, countPokemonAvailable, getAllPokemon};