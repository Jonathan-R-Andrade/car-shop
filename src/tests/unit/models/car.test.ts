import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId,
  carsMockWithId,
} from '../../mocks/carMock';
import { errorCatalog } from '../../../errors/HttpErrorCatalog';

chai.use(chaiAsPromised);

describe('Car Model', () => {
  const carModel = new CarModel();
  const invalidId = 'abc123';

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carsMockWithId);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('creating a car', async () => {
      const createdCar = await carModel.create(carMock);
      expect(createdCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('read', () => {
    it('getting all cars', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(carsMockWithId);
    });
  });

  describe('readOne', () => {
    it('getting one car', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('trying to get one car with incorrect id', async () => {
      const result = carModel.readOne(invalidId);
      await expect(result).to.be.rejectedWith(errorCatalog.InvalidMongoId.message);
    });
  });

  describe('update', () => {
    it('updating a car', async () => {
      const updatedCar = await carModel.update(carMockWithId._id, carMock);
      expect(updatedCar).to.be.deep.equal(carMockWithId);
    });

    it('trying to update a car with incorrect id', async () => {
      const result = carModel.update(invalidId, carMock);
      await expect(result).to.be.rejectedWith(errorCatalog.InvalidMongoId.message);
    });
  });

  describe('delete', () => {
    it('deleting a car', async () => {
      const deletedCar = await carModel.delete(carMockWithId._id);
      expect(deletedCar).to.be.deep.equal(carMockWithId);
    });

    it('trying to delete a car with incorrect id', async () => {
      const result = carModel.delete(invalidId);
      await expect(result).to.be.rejectedWith(errorCatalog.InvalidMongoId.message);
    });
  });
});
