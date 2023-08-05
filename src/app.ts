import 'express-async-errors';
import express from 'express';
import handleErrors from './middlewares/handleErrors';
import carsRoute from './routes/cars';
import motorcyclesRoute from './routes/motorcyclesRoute';
import swaggerDocsRoute from './routes/swaggerDocsRoute';

const app = express();
const api = express();

api
  .use(express.json())
  .use('/docs', swaggerDocsRoute)
  .use('/cars', carsRoute)
  .use('/motorcycles', motorcyclesRoute)
  .use(handleErrors);

app.use('/api/v1', api);

export default app;
