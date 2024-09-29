import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  
  constructor(private loggingService: LoggingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            this.loggingService.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
          }
        },
        error => {
          this.loggingService.error(`Request for ${req.urlWithParams} failed with error: ${error.message}`);
        }
      )
    );
  }
}
