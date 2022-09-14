import 'express-async-errors';
import express from 'express';
import handleErrors from './middlewares/handleErrors';
import carsRoute from './routes/cars';

const app = express();

app.use(express.json());

app.use('/cars', carsRoute);

app.use(handleErrors);

export default app;
