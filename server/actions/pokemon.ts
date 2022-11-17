import { PokemonCreateInput } from '../types';
import prisma from '../lib/prisma'

const createPokemon = async (teamId: number, params: PokemonCreateInput) => {
    try {

        let assign: object = {
            create: {
                assignedAt: new Date(),
                team: {
                    connect: {
                        id: teamId,
                    },
                }
            }
        }

        params.teams = assign;

        const pokemon = await prisma.pokemon.create({
            data: params
        })
        return pokemon;

    } catch (err) {

        try {
            const pokemon = await prisma.teamPokemon.create({
                data: {
                    assignedAt: new Date(),
                    pokemonId: params.id,
                    teamId: teamId
                }
            })
            return pokemon;
            
        } catch (err) {
            return { error: "Unable to assign pokemon" };
        }

    }
}



export {
    createPokemon
};