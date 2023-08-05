import { Router } from 'express';
import CarModel from '../models/Car';
import CarService from '../services/Car';
import CarController from '../controllers/Car';

const carsRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carsRoute.route('/')
  .post((req, res) => carController.create(req, res))
  .get((req, res) => carController.read(req, res));
  
carsRoute.route('/:id')
  .get((req, res) => carController.readOne(req, res))
  .put((req, res) => carController.update(req, res))
  .delete((req, res) => carController.delete(req, res));

export default carsRoute;
