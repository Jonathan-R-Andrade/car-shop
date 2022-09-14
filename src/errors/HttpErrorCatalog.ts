import HttpStatus from '../enums/HttpStatus';

export enum ErrorTypes {
  InvalidMongoId = 'InvalidMongoId',
  NotFound = 'NotFound',
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
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
  NotFound: {
    message: 'Not Found',
    httpStatus: HttpStatus.NOT_FOUND,
  },
};
