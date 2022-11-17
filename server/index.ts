import express, { Express, Request, Response } from 'express';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.HTTP_PORT;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});  


app.use(express.json());
app.use('/', routes);


app.get('/', (req: Request, res: Response) => {
    res.send("OK");
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))