const pokemon = [
    {
        name: "Blastoise",
        type: ["Water"]
    },    {
        name: "Charizard",
        type: ["Fire", "Flying"]
    },    {
        name: "Venusaur",
        type: ["Grass", "Poison"]
    },    {
        name: "Meganium",
        type: ["Grass"]
    },    {
        name: "Typhlosion",
        type: ["Fire"]
    },    {
        name: "Feraligatr",
        type: ["Water"]
    },    {
        name: "Sceptile",
        type: ["Grass"]
    },    {
        name: "Blaziken",
        type: ["Fire"]
    },    {
        name: "Swampert",
        type: ["Water", "Ground"]
    },    {
        name: "Torterra",
        type: ["Grass", "Ground"]
    },    {
        name: "Infernape",
        type: ["Fire", "Fighting"]
    },    {
        name: "Empoleon",
        type: ["Water", "Steel"]
    },    {
        name: "Dragonite",
        type: ["Flying", "Dragon"]
    },    {
        name: "Tyranitar",
        type: ["Rock", "Dark"]
    },    {
        name: "Salamence",
        type: ["Flying", "Dragon"]
    },    {
        name: "Metagross",
        type: ["Steel", "Psychic"]
    },    {
        name: "Garchomp",
        type: ["Ground", "Dragon"]
    },    {
        name: "Raikou",
        type: ["Electric"]
    },    {
        name: "Entei",
        type: ["Fire"]
    },    {
        name: "Suicune",
        type: ["Water"]
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