import express, { Request, Response } from 'express';
import { createPokemon } from '../actions/pokemon';

const pokemonRouter = express.Router();

pokemonRouter.post('/:id', async (req: Request, res: Response) => {
    console.log('Create pokemon');
    const result = await createPokemon(Number(req.params.id), req.body);
    res.send(result);
});


export default pokemonRouter;

