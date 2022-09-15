import HttpStatus from '../enums/HttpStatus';

export enum ErrorTypes {
  InvalidMongoId = 'InvalidMongoId',
  ObjectNotFound = 'ObjectNotFound',
}

export type ErrorResponseObject = {
  message: string;
  httpStatus: HttpStatus;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: HttpStatus.NOT_FOUND,
  },
};
