import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs'
import { AuthService } from '../services/auth.service';

// Adds authorization header to every http request that's sent out
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token: string = this.authService.getToken()
    const authReq = (token) ?
      req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } }) :
      req

    return next.handle(authReq).toPromise()
  }
}
