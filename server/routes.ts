import { Router } from 'express';
import teamRouter from './routes/team';
import pokemonRouter from './routes/pokemon';

const routes = Router();

routes.use('/team', teamRouter);
routes.use('/pokemon', pokemonRouter);

export default routes;