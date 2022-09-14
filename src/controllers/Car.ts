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
}
