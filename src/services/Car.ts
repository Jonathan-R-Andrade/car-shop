import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { errorCatalog } from '../errors/HttpErrorCatalog';
import HttpError from '../errors/HttpError';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._car.create(parsed.data);
  }

  public async readOne(id: string): Promise<ICar> {
    const car = await this._car.readOne(id);
    if (!car) throw new HttpError(errorCatalog.NotFound);

    return car;
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async update(id: string, car: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(car);
    if (!parsed.success) throw parsed.error;

    const result = await this._car.update(id, parsed.data);
    if (!result) throw new HttpError(errorCatalog.NotFound);

    return result;
  }

  public async delete(id: string): Promise<void> {
    const result = await this._car.delete(id);
    if (!result) throw new HttpError(errorCatalog.NotFound);
  }
}

export default CarService;
