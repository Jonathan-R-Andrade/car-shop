import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../swagger-docs';

const swaggerDocsRoute = Router();

const languageCodePath = /^\/[a-z]{2}-[a-z]{2}/; // regex to match /pt-br, /en-us, etc

swaggerDocsRoute.use(languageCodePath, swaggerUI.serve);

swaggerDocsRoute.get('/pt-br', swaggerUI.setup(swaggerDocs.PtBr));

export = swaggerDocsRoute;
