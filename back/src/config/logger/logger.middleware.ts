import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, params, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `
        ----------------------------------------------------------
        \n${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}\n`,
      );

      this.logger.verbose('params', params, 'query', query);
    });

    next();
  }
}
