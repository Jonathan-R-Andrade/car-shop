import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleController from '../controllers/Motorcycle';

const motorcyclesRoute = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcyclesRoute.post('/', (req, res) => motorcycleController.create(req, res));
motorcyclesRoute.get('/', (req, res) => motorcycleController.read(req, res));
motorcyclesRoute.get('/:id', (req, res) => motorcycleController.readOne(req, res));
motorcyclesRoute.put('/:id', (req, res) => motorcycleController.update(req, res));
motorcyclesRoute.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default motorcyclesRoute;
