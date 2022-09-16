import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import HttpError from '../errors/HttpError';
import { errorCatalog } from '../errors/HttpErrorCatalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    const createdCar = (await this._model.create({ ...obj }));
    createdCar.__v = undefined;
    return createdCar;
  }

  public async read(): Promise<T[]> {
    return this._model.find({}, { __v: 0 });
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HttpError(errorCatalog.InvalidMongoId);
    return this._model.findById(id, { __v: 0 });
  }

  public async update(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HttpError(errorCatalog.InvalidMongoId);
    return this._model.findByIdAndUpdate(
      id,
      obj as UpdateQuery<T>,
      { new: true, projection: { __v: 0 } },
    );
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HttpError(errorCatalog.InvalidMongoId);
    return this._model.findByIdAndDelete(id, { projection: { __v: 0 } });
  }
}

export default MongoModel;
