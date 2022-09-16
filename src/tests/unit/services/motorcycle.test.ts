import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import HttpError from '../../../errors/HttpError';
import { ZodError } from 'zod';
import { errorMessages, InvalidMongoId, nonexistentId } from '../../mocks/mocks';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcyclesMockWithId,
  motorcycleMockWithoutModel,
} from '../../mocks/motorcycleMock';

chai.use(chaiAsPromised);

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves(motorcyclesMockWithId);
    sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleMockWithId)
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).rejects(Error(errorMessages.InvalidMongoId));
    sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockWithId)
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).rejects(Error(errorMessages.InvalidMongoId));
    sinon.stub(motorcycleModel, 'delete').resolves(motorcycleMockWithId)
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).rejects(Error(errorMessages.InvalidMongoId));
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('creating a motorcycle', async () => {
      const createdMotorcycle = await motorcycleService.create(motorcycleMock);
      expect(createdMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('trying to create a motorcycle without the model', async () => {
      const result = motorcycleService.create(motorcycleMockWithoutModel);
      await expect(result).to.be.rejectedWith(ZodError);
    });
  });

  describe('read', () => {
    it('getting all motorcycles', async () => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.deep.equal(motorcyclesMockWithId);
    });
  });

  describe('readOne', () => {
    it('getting one motorcycle', async () => {
      const motorcycle = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('trying to get one motorcycle with nonexistent id', async () => {
      const result = motorcycleService.readOne(nonexistentId);
      await expect(result).to.be.rejectedWith(HttpError, errorMessages.ObjectNotFound);
    });

    it('trying to get one motorcycle with incorrect id', async () => {
      const result = motorcycleService.readOne(InvalidMongoId);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });

  describe('update', () => {
    it('updating a motorcycle', async () => {
      const updatedMotorcycle = await motorcycleService
        .update(motorcycleMockWithId._id, motorcycleMock);
      expect(updatedMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('trying to update a motorcycle with nonexistent id', async () => {
      const result = motorcycleService.update(nonexistentId, motorcycleMock);
      await expect(result).to.be.rejectedWith(errorMessages.ObjectNotFound);
    });

    it('trying to update a motorcycle with incorrect id', async () => {
      const result = motorcycleService.update(InvalidMongoId, motorcycleMock);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });

    it('trying to update a motorcycle without the model', async () => {
      const result = motorcycleService
        .update(motorcycleMockWithId._id, motorcycleMockWithoutModel);
      await expect(result).to.be.rejectedWith(ZodError);
    });
  });

  describe('delete', () => {
    it('deleting a motorcycle', async () => {
      const deletedMotorcycle = await motorcycleService.delete(motorcycleMockWithId._id);
      expect(deletedMotorcycle).to.be.undefined;
    });

    it('trying to delete a motorcycle with nonexistent id', async () => {
      const result = motorcycleService.delete(nonexistentId);
      await expect(result).to.be.rejectedWith(errorMessages.ObjectNotFound);
    });

    it('trying to delete a motorcycle with incorrect id', async () => {
      const result = motorcycleService.delete(InvalidMongoId);
      await expect(result).to.be.rejectedWith(errorMessages.InvalidMongoId);
    });
  });
});
