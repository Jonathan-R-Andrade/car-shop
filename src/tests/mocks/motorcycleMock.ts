import { IMotorcycle, IMotorcycleWithId } from '../../interfaces/IMotorcycle';

const motorcycleMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const motorcycleMock2: IMotorcycle = {
  model: 'Lazareth LM 410',
  year: 2020,
  color: 'red',
  buyValue: 550000,
  category: 'Street',
  engineCapacity: 1000,
};

const motorcycleMockWithId: IMotorcycleWithId = {
  ...motorcycleMock,
  _id: '6324bff1f72bc232a4d0c5d1',
};

const motorcycleMockWithId2: IMotorcycleWithId = {
  ...motorcycleMock2,
  _id: '6324bff1f72bc232a4d0c5d2',
};

const motorcyclesMockWithId: IMotorcycleWithId[] = [
  motorcycleMockWithId,
  motorcycleMockWithId2,
];

const motorcycleMockWithoutModel: any = {
  year: 2020,
  color: 'red',
  buyValue: 550000,
  category: 'Street',
  engineCapacity: 1000,
};

export {
  motorcycleMock,
  motorcycleMockWithId,
  motorcyclesMockWithId,
  motorcycleMockWithoutModel
};
