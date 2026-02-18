import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresService, Score } from '../services/scores.service';
import { Player } from '../services/players.service';

@Component({
  selector: 'app-scores',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './scores.html',
  styleUrl: './scores.scss',
})
export class Scores {
  loading = false;
  error = '';
  scores: Score[] = [];

  constructor(private scoresService: ScoresService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores(): void {
    this.loading = true;
    this.error = '';
    this.scores = [];
    this.cdr.detectChanges();

    this.scoresService.getScores().subscribe({
      next: (res) => {
        this.scores = Array.isArray(res?.scores) ? res.scores : [];
        console.log('Loaded scores:', this.scores);
        this.loading = false;
        this.cdr.detectChanges(); // <-- force UI refresh after async
      },
      error: (err) => {
        this.loading = false;
        this.scores = [];
        console.error('Failed to load scores:', err);
        this.error = err?.error?.error ?? err?.message ?? 'Failed to load scores.';
        this.cdr.detectChanges(); // <-- force UI refresh after async
      }
    });
  }

  formatHandicap(h: Score['handicap']): string {
    if (h === null || h === undefined || h === '') return '—';
    const n = typeof h === 'string' ? Number(h) : h;
    return Number.isFinite(n) ? n.toFixed(1) : String(h);
  }

}
