import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { datadogLogs } from '@datadog/browser-logs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'docker-app';

  constructor(private http: HttpClient,private router: Router) {
    this.http.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe()
  }

  public throwTestError(): void {
    throw new Error("Sentry Test Error");
  }

  showContent = true;

  triggerError() {
    try {
      // Simula um erro
      throw new Error('Erro simulado na UI');
    } catch (error: any) {
      // Captura o erro no Datadog
      datadogLogs.logger.error('Erro capturado', { 
        error: error.message, 
        stack: error.stack 
      });
    }
  } 

  logEvent() {
    // Envia um log personalizado ao Datadog
    datadogLogs.logger.log('Evento registrado', { 
      level: 'info', 
      context: { user: 'test-user', action: 'click' }
    });
  }

  ngOnInit(): void {
    // Simulação de lógica que oculta o conteúdo após 3 segundos
    setTimeout(() => {
      this.showContent = false;  // O conteúdo será removido
    }, 3000);
  }

  updateUI(): void {
    try {
      // Tentativa de atualizar um elemento que pode não existir mais
      const contentElement = document.getElementById('content');
      if (!contentElement) {
        throw new Error('Elemento de conteúdo não encontrado na UI');
      }
      contentElement.innerText = 'Conteúdo atualizado com sucesso!';
    } catch (error) {
      // Captura o erro no Sentry
    }
  }

  navigateToNonExistentRoute() {
    // Navega para uma rota inexistente
    this.router.navigate(['/non-existent-route']);
  }

  makeHttpRequest() {
    // Simulando uma requisição para um endpoint inválido
    this.http.get('https://jsonplaceholder.typicode.com/invalid-url').subscribe(
      response => {
        console.log('Resposta da API:', response);
      },
      error => {
        // O Sentry captura automaticamente esse erro de rede
      }
    );
  }
}
