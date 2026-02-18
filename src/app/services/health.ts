import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Health {
  constructor(private http: HttpClient) {}

  health() {
    return this.http.get(`${environment.apiBaseUrl}/health/`);
  }

  testDb() {
    return this.http.get(`${environment.apiBaseUrl}/health/db/`);
  }

  getPlayers() {
  return this.http.get<any>(`${environment.apiBaseUrl}/players/`);
}

}
