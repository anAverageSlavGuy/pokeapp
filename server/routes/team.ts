import express, { Request, Response } from 'express';
import { getTeams, getTeamById, updateTeamById, createTeam, deleteTeamById } from '../actions/team';

const teamRouter = express.Router();

teamRouter.get('/', async (req: Request, res: Response) => {
    const result = await getTeams();
    res.send(result);
});


teamRouter.get('/:id', async (req: Request, res: Response) => {
    const result = await getTeamById(Number(req.params.id));
    res.send(result);
});


teamRouter.put('/:id', async (req: Request, res: Response) => {
    const result = await updateTeamById(Number(req.params.id), req.body);
    res.send(result);
});


teamRouter.post('/', async (req: Request, res: Response) => {
    console.log('Create team');
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const result = await createTeam(req.body);
    res.send(result);
});


teamRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await deleteTeamById(Number(req.params.id));
    res.send(result);
});


export default teamRouter;

