import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { errorMessages, InvalidMongoId } from '../../mocks/mocks';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcyclesMockWithId,
} from '../../mocks/motorcycleMock';

chai.use(chaiAsPromised);

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves(motorcyclesMockWithId);
    sinon.stub(Model, 'findById').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('creating a motorcycle', async () => {
      const createdMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(createdMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('read', () => {
    it('getting all motorcycles', async () => {
      const motorcycles = await motorcycleModel.read();
      expect(motorcycles).to.be.deep.equal(motorcyclesMockWithId);
    });
  });

  describe('readOne', () => {
    it('getting one motorcycle', async () => {
      const motorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('trying to get one motorcycle with incorrect id', async () => {
      const result = motorcycleModel.readOne(InvalidMongoId);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });

  describe('update', () => {
    it('updating a motorcycle', async () => {
      const updatedMotorcycle = await motorcycleModel
        .update(motorcycleMockWithId._id, motorcycleMock);
      expect(updatedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('trying to update a motorcycle with incorrect id', async () => {
      const result = motorcycleModel.update(InvalidMongoId, motorcycleMock);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });

  describe('delete', () => {
    it('deleting a motorcycle', async () => {
      const deletedMotorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
      expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('trying to delete a motorcycle with incorrect id', async () => {
      const result = motorcycleModel.delete(InvalidMongoId);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });
});
