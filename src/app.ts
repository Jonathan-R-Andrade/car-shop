import 'express-async-errors';
import express from 'express';
import handleErrors from './middlewares/handleErrors';
import carsRoute from './routes/cars';
import motorcyclesRoute from './routes/motorcyclesRoute';
import swaggerDocsRoute from './routes/swaggerDocsRoute';

const app = express();

app.use(express.json());

app.use('/docs', swaggerDocsRoute);
app.use('/cars', carsRoute);
app.use('/motorcycles', motorcyclesRoute);

app.use(handleErrors);

export default app;
