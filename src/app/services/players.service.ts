import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Player {
  id: number;
  team_id: number | null;
  first_name: string;
  last_name: string;
  handicap: number | string | null;
  created_at?: string | null;
}

export interface PlayersResponse {
  ok: boolean;
  players: Player[];
}

@Injectable({ providedIn: 'root' })
export class PlayersService {
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<PlayersResponse> {
    return this.http.get<PlayersResponse>(`${environment.apiBaseUrl}/players/`);
  }
}
