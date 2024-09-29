import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  log(message: string) {
    console.log(`Log: ${message}`);
    // Aqui você poderia enviar os logs para um servidor de monitoramento.
  }

  error(message: string) {
    console.error(`Error: ${message}`);
    // Aqui você poderia enviar os erros para um servidor de monitoramento.
  }
}
