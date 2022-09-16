import chai, { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import MotorcycleController from '../../../controllers/Motorcycle';
import chaiAsPromised from 'chai-as-promised';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcyclesMockWithId,
  motorcycleMockWithoutModel,
} from '../../mocks/motorcycleMock';
import { errorMessages, InvalidMongoId } from '../../mocks/mocks';

chai.use(chaiAsPromised);

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel()
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).rejects(new Error());
    sinon.stub(motorcycleService, 'read').resolves(motorcyclesMockWithId);
    sinon.stub(motorcycleService, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).rejects(new Error(errorMessages.InvalidMongoId))
    sinon.stub(motorcycleService, 'update')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).rejects(new Error(errorMessages.InvalidMongoId));
    sinon.stub(motorcycleService, 'delete')
      .onCall(0).resolves()
      .onCall(1).rejects(new Error(errorMessages.InvalidMongoId));

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('create', () => {
    it('creating a motorcycle', async () => {
      req.body = motorcycleMock;

      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });


    it('trying to create a motorcycle without the model', async () => {
      req.body = motorcycleMockWithoutModel;

      const result = motorcycleController.create(req, res);

      await expect(result).to.be.rejectedWith(Error);
    });
  });

  describe('read', () => {
    it('getting all motorcycles', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesMockWithId)).to.be.true;
    });
  });

  describe('readOne', () => {
    it('getting one motorcycle', async () => {
      req.params = { id: motorcycleMockWithId._id };

      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

    it('trying to get one motorcycle with incorrect id', async () => {
      req.params = { id: InvalidMongoId };

      const result = motorcycleController.readOne(req, res);

      await expect(result).to.be.rejectedWith(Error, errorMessages.InvalidMongoId);
    });
  });

  describe('update', () => {
    it('updating a motorcycle', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = motorcycleMock;

      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });

    it('trying to update a motorcycle with incorrect id', async () => {
      req.params = { id: InvalidMongoId };
      req.body = motorcycleMock;

      const result = motorcycleController.update(req, res);

      await expect(result).to.be.rejectedWith(Error, errorMessages.InvalidMongoId);
    });
  });

  describe('delete', () => {
    it('deleting a motorcycle', async () => {
      req.params = { id: motorcycleMockWithId._id };

      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.end as sinon.SinonStub).called).to.be.true;
    });

    it('trying to delete a motorcycle with incorrect id', async () => {
      req.params = { id: InvalidMongoId };

      const result = motorcycleController.delete(req, res);

      await expect(result).to.be.rejectedWith(Error, errorMessages.InvalidMongoId);
    });
  });
});
