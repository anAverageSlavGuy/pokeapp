import { Router } from 'express';
import teamRouter from './routes/team';
import pokemonRouter from './routes/pokemon';
import teamPokemonRouter from './routes/teamPokemon';

const routes = Router();

routes.use('/team', teamRouter);
routes.use('/pokemon', pokemonRouter);
routes.use('/teamPokemon', teamPokemonRouter);

export default routes;