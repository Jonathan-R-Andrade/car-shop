import { Router } from 'express';
import CarModel from '../models/Car';
import CarService from '../services/Car';
import CarController from '../controllers/Car';

const carsRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carsRoute.post('/', (req, res) => carController.create(req, res));

export default carsRoute;
