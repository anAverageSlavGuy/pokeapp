import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

const deleteTeamPokemon = async (teamId: number, pokemonId: number) => {
    try {

        /* let params: Prisma.TeamPokemonWhereUniqueInput = {
            pokemonId_teamId: `${pokemonId}_${teamId}` as unknown as Prisma.TeamPokemonPokemonIdTeamIdCompoundUniqueInput,
        }; */

        let tp: Prisma.TeamPokemonPokemonIdTeamIdCompoundUniqueInput = {
            pokemonId: pokemonId,
            teamId: teamId
        };

        let params: Prisma.TeamPokemonWhereUniqueInput = {
            pokemonId_teamId: tp
        };

        const teamPokemon = await prisma.teamPokemon.delete({
            where: params
        });
        
        return teamPokemon;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
}



export {
    deleteTeamPokemon
};