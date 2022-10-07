import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExecptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const RespostaMessage = {
      status: JSON.stringify(status),
      timestamp: new Date().toISOString(),
      path: request.path,
      ErrorMessage: message,
    };
    this.logger.error(RespostaMessage);
    response.status(status).json(RespostaMessage);
  }
}
