import chai, { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import chaiAsPromised from 'chai-as-promised';
import {
  carMock,
  carMockWithId,
  carMockWithoutModel,
  carsMockWithId,
} from '../../mocks/carMock';
import { errorMessages, InvalidMongoId } from '../../mocks/mocks';

chai.use(chaiAsPromised);

describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).rejects(new Error());
    sinon.stub(carService, 'read').resolves(carsMockWithId);
    sinon.stub(carService, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).rejects(new Error(errorMessages.InvalidMongoId))
    sinon.stub(carService, 'update')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).rejects(new Error(errorMessages.InvalidMongoId));
    sinon.stub(carService, 'delete')
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
    it('creating a car', async () => {
      req.body = carMock;

      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });


    it('trying to create a car without the model', async () => {
      req.body = carMockWithoutModel;

      const result = carController.create(req, res);

      await expect(result).to.be.rejectedWith(Error);
    });
  });

  describe('read', () => {
    it('getting all cars', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('readOne', () => {
    it('getting one car', async () => {
      req.params = { id: carMockWithId._id };

      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

    it('trying to get one car with incorrect id', async () => {
      req.params = { id: InvalidMongoId };

      const result = carController.readOne(req, res);

      await expect(result).to.be.rejectedWith(Error, errorMessages.InvalidMongoId);
    });
  });

  describe('update', () => {
    it('updating a car', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMock;

      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

    it('trying to update a car with incorrect id', async () => {
      req.params = { id: InvalidMongoId };
      req.body = carMock;

      const result = carController.update(req, res);

      await expect(result).to.be.rejectedWith(Error, errorMessages.InvalidMongoId);
    });
  });

  describe('delete', () => {
    it('deleting a car', async () => {
      req.params = { id: carMockWithId._id };

      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.end as sinon.SinonStub).called).to.be.true;
    });

    it('trying to delete a car with incorrect id', async () => {
      req.params = { id: InvalidMongoId };

      const result = carController.delete(req, res);

      await expect(result).to.be.rejectedWith(Error, errorMessages.InvalidMongoId);
    });
  });
});
