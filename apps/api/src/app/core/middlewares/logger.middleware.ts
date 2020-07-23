import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    try {
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest && offuscateRequest.password)
        offuscateRequest.password = '*******';
      if (offuscateRequest && offuscateRequest.newPassword)
        offuscateRequest.newPassword = '*******';
      if (offuscateRequest && offuscateRequest.currentPassword)
        offuscateRequest.currentPassword = '*******';
      if (offuscateRequest && offuscateRequest.confirm_password)
        offuscateRequest.confirm_password = '*******';
      if (offuscateRequest !== {})
        console.log(
          new Date().toString() +
            ' - [Request] ' +
            req.baseUrl +
            req.url
            +
            ' - ' +
            JSON.stringify(offuscateRequest)
        );
    } catch (error) {}
    next();
  }
}
