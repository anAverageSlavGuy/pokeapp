export type Team = {
    id: number
    name: string
    createdAt: Date
    pokemons: Pokemon[]
    pokemonTypes?: string[]
    visible?: boolean
};

export type TeamParameters = {
    id: number
    name: string
};

export type TeamPokemonParameters = {
    teamId: number
    pokemonId: number
    assignedAt: Date
};

export type Pokemon = {
    id: number
    name: string
    baseExp: number
    imageFront: string
    imageBack: string
    abilities: string
    types: string
};

export type PokemonAbility = {
    ability: { name: string, url: string }
}

export type PokemonType = {
    type: { name: string, url: string }
}

export enum ColorTypes {
    normal = "#A8A77A",
    fire = "#EE8130",
    water = "#b4dfff",
    electric = "#F7D02C",
    grass = "#96f9c9",
    ice = "#96D9D6",
    fighting = "#ff6660",
    poison = "#930c9078",
    ground = "#E2BF65",
    flying = "#A98FF3",
    psychic = "#fb8eaf",
    bug = "#A6B91A",
    rock = "#B6A136",
    ghost = "#735797",
    dragon = "#a07bf9",
    dark = "#705746",
    steel = "#B7B7CE",
    fairy = "#D685AD"
}