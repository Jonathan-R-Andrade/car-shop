import { ICar, ICarWithId } from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2
};

const carMock2: ICar = {
  model: 'Ferrari Purosangue',
  year: 2022,
  color: 'blue',
  status: true,
  buyValue: 6000000,
  doorsQty: 4,
  seatsQty: 4
};

const carMockWithId: ICarWithId = {
  ...carMock,
  _id: '63224a9f9ef50b69b2338c45',
};

const carMockWithId2: ICarWithId = {
  ...carMock2,
  _id: '63224d209ef50b69b2338c47',
};

const carsMockWithId: ICarWithId[] = [
  carMockWithId,
  carMockWithId2,
];

const carMockWithoutModel: any = {
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2
};

export { carMock, carMockWithId, carsMockWithId, carMockWithoutModel };
