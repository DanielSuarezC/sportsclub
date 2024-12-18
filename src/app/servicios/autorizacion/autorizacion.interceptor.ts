import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/enviroments/environment';

@Injectable()
export class AutorizacionInterceptor implements HttpInterceptor {

  // constructor(private cookieService: CookieService, private router: Router) {}
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.cookieService.get(environment.nombreCookieToken);
  //   console.debug('*Interceptor' + token);
  //   if (!token) {
  //     this.router.navigate(['login']);
  //     return next.handle(req);
  //   } else {
  //     const fecha = new Date();
  //     fecha.setMinutes(fecha.getMinutes() + environment.duracionMinutosCookieToken);
  //     this.cookieService.set(environment.nombreCookieToken, token, fecha);
    // }
    const headers = req.clone({
      headers: req.headers.set('token', 'token')
    });
    return next.handle(headers);
  }
}
