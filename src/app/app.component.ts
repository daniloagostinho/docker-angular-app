import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'docker-app';

  constructor(private http: HttpClient) {
    this.http.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe()
  }
}
