import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import HttpStatus from '../enums/HttpStatus';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request,
    res: Response<ICar>,
  ) {
    const car = req.body;
    const createdCar = await this._service.create(car);
    return res.status(HttpStatus.CREATED).json(createdCar);
  }

  public async read(
    req: Request,
    res: Response<ICar[]>,
  ) {
    const cars = await this._service.read();
    return res.status(HttpStatus.OK).json(cars);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    const car = await this._service.readOne(id);
    return res.status(HttpStatus.OK).json(car);
  }

  public async update(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;
    const car = req.body;
    const updatedCar = await this._service.update(id, car);
    return res.status(HttpStatus.OK).json(updatedCar);
  }
}
