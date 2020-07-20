import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor(
    @Inject('environment') private environment: any,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth.token');
    const apiReq = req.clone({
      url: `${this.environment.host}/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(apiReq);
  }
}
