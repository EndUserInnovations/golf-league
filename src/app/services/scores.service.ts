import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Score {
  full_name: string;
  handicap: number | string | null;
  Week1: number | null;
  Week2: number | null;
  Week3: number | null;
  Week4: number | null;
  Week5: number | null;
  Week6: number | null;
  Week7: number | null;
  Week8: number | null;
  Week9: number | null;
  Week10: number | null;
  Week11: number | null;
  Week12: number | null;
  Week13: number | null;
  Week14: number | null;
  Week15: number | null;
  Week16: number | null;
  Week17: number | null;
  Week18: number | null;
  Week19: number | null;
  Week20: number | null;
}

export interface ScoresResponse {
  ok: boolean;
  scores: Score[];
}

@Injectable({ providedIn: 'root' })
export class ScoresService {
  constructor(private http: HttpClient) {}

  getScores(): Observable<ScoresResponse> {
    return this.http.get<ScoresResponse>(`${environment.apiBaseUrl}/scores/`);
  }
}
