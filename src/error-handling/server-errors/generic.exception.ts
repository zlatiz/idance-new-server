import { HttpException, HttpStatus } from '@nestjs/common';

export class GenericServerException extends HttpException {
  constructor(message: string = 'Internal Server Error') {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message,
        error: 'Internal Server Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
