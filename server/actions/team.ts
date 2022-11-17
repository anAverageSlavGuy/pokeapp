import { TeamCreateInput } from '../types';
import prisma from '../lib/prisma'


const getTeams = async () => {
    const teams = await prisma.team.findMany({
        include: { pokemons: { include: { pokemon: true } } },
    })
    const result = teams.map((team) => {
        return { ...team, pokemons: team.pokemons.map((pokemon) => pokemon.pokemon) }
    })
    return result;
}


const getTeamById = async (id: number) => {
    const team = await prisma.team.findUnique({
        where: { id: id },
        include: { pokemons: { include: { pokemon: true } } }
    })

    if (team) {
        const result = { ...team, pokemons: team.pokemons.map((pokemon) => pokemon.pokemon) };
        return result;
    } else {
        return { error: `Team with id ${id} not found` };
    }
}


const updateTeamById = async (id: number, params: TeamCreateInput) => {
    try {
        const team = await prisma.team.update({
            where: { id: id },
            data: params
        })
        return team;
    } catch (err) {
        return { error: `Unable to update team with id ${id}` };
    }
}


const createTeam = async (params: TeamCreateInput) => {
    try {
        const team = await prisma.team.create({ data: params })
        return team;
    } catch (err) {
        return { error: "Unable to create team, duplicated name" };
    }
}


const deleteTeamById = async (id: number) => {
    try {
        const team = await prisma.team.delete({
            where: {
                id: id,
            },
        });
        return team;
    } catch (err) {
        return { error: `Unable to delete, team with id ${id} not found` };
    }
}


export {
    getTeams,
    getTeamById,
    updateTeamById,
    createTeam,
    deleteTeamById
};