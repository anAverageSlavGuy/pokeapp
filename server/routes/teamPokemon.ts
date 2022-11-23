import express, { Request, Response } from 'express';
import { deleteTeamPokemon } from '../actions/teamPokemon';

const teamPokemonRouter = express.Router();

teamPokemonRouter.delete('/', async (req: Request, res: Response) => {
    console.log('delete pokemon from team');
    const result = await deleteTeamPokemon(req.body.teamId, req.body.pokemonId);
    res.send(result);
});


export default teamPokemonRouter;
