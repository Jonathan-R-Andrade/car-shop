import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import HttpStatus from '../enums/HttpStatus';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const motorcycle = req.body;
    const createdMotorcycle = await this._service.create(motorcycle);
    return res.status(HttpStatus.CREATED).json(createdMotorcycle);
  }

  public async read(
    req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const motorcycles = await this._service.read();
    return res.status(HttpStatus.OK).json(motorcycles);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const motorcycle = await this._service.readOne(id);
    return res.status(HttpStatus.OK).json(motorcycle);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const motorcycle = req.body;
    const updatedMotorcycle = await this._service.update(id, motorcycle);
    return res.status(HttpStatus.OK).json(updatedMotorcycle);
  }

  public async delete(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(HttpStatus.NO_CONTENT).end();
  }
}
