// Type alias for create/update Team 
export type TeamCreateInput = {
    name: string
};

export type PokemonCreateInput = {
    id: number
    name: string
    baseExp: number
    imageFront: string
    imageBack: string
    abilities: string
    types: string
    teams: object
};