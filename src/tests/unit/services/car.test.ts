import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import HttpError from '../../../errors/HttpError';
import { ZodError } from 'zod';
import { errorMessages, InvalidMongoId, nonexistentId } from '../../mocks/mocks';
import {
  carMock,
  carMockWithId,
  carMockWithoutModel,
  carsMockWithId,
} from '../../mocks/carMock';

chai.use(chaiAsPromised);

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(carsMockWithId);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId)
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).rejects(Error(errorMessages.InvalidMongoId));
    sinon.stub(carModel, 'update').resolves(carMockWithId)
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).rejects(Error(errorMessages.InvalidMongoId));
    sinon.stub(carModel, 'delete').resolves(carMockWithId)
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).rejects(Error(errorMessages.InvalidMongoId));
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('creating a car', async () => {
      const createdCar = await carService.create(carMock);
      expect(createdCar).to.be.deep.equal(carMockWithId);
    });

    it('trying to create a car without the model', async () => {
      const result = carService.create(carMockWithoutModel);
      await expect(result).to.be.rejectedWith(ZodError);
    });
  });

  describe('read', () => {
    it('getting all cars', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal(carsMockWithId);
    });
  });

  describe('readOne', () => {
    it('getting one car', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('trying to get one car with nonexistent id', async () => {
      const result = carService.readOne(nonexistentId);
      await expect(result).to.be.rejectedWith(HttpError, errorMessages.NotFound);
    });

    it('trying to get one car with incorrect id', async () => {
      const result = carService.readOne(InvalidMongoId);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });

  describe('update', () => {
    it('updating a car', async () => {
      const updatedCar = await carService.update(carMockWithId._id, carMock);
      expect(updatedCar).to.be.deep.equal(carMockWithId);
    });

    it('trying to update a car with nonexistent id', async () => {
      const result = carService.update(nonexistentId, carMock);
      await expect(result).to.be.rejectedWith(errorMessages.NotFound);
    });

    it('trying to update a car with incorrect id', async () => {
      const result = carService.update(InvalidMongoId, carMock);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });

    it('trying to update a car without the model', async () => {
      const result = carService.update(carMockWithId._id, carMockWithoutModel);
      await expect(result).to.be.rejectedWith(ZodError);
    });
  });

  describe('delete', () => {
    it('deleting a car', async () => {
      const deletedCar = await carService.delete(carMockWithId._id);
      expect(deletedCar).to.be.undefined;
    });

    it('trying to delete a car with nonexistent id', async () => {
      const result = carService.delete(nonexistentId);
      await expect(result).to.be.rejectedWith(errorMessages.NotFound);
    });

    it('trying to delete a car with incorrect id', async () => {
      const result = carService.delete(InvalidMongoId);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });
});
