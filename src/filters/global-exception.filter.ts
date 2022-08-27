import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongooseError } from 'mongoose';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status;
    let message;
    if (exception instanceof HttpException) {
      const ex = exception as HttpException;
      status = ex.getStatus();
      message = ex.getResponse();
    } else if (exception.name === 'ValidationError' || exception.name === 'MongoServerError') {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message || 'unknown error';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'unknown error';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
