import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { errorCatalog } from '../errors/HttpErrorCatalog';
import HttpError from '../errors/HttpError';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(motorcycle);
    if (!parsed.success) throw parsed.error;

    return this._motorcycle.create(parsed.data);
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(id);
    if (!motorcycle) throw new HttpError(errorCatalog.ObjectNotFound);

    return motorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async update(id: string, motorcycle: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(motorcycle);
    if (!parsed.success) throw parsed.error;

    const result = await this._motorcycle.update(id, parsed.data);
    if (!result) throw new HttpError(errorCatalog.ObjectNotFound);

    return result;
  }

  public async delete(id: string): Promise<void> {
    const result = await this._motorcycle.delete(id);
    if (!result) throw new HttpError(errorCatalog.ObjectNotFound);
  }
}

export default MotorcycleService;
