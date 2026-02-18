import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService, Player } from '../services/players.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.html',
  styleUrl: './players.scss',
})
export class Players {
  loading = false;
  error = '';
  players: Player[] = [];

  constructor(private playersService: PlayersService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.loading = true;
    this.error = '';
    this.players = [];
    this.cdr.detectChanges();

    this.playersService.getPlayers().subscribe({
      next: (res) => {
        this.players = Array.isArray(res?.players) ? res.players : [];
        console.log('Loaded players:', this.players);
        this.loading = false;
        this.cdr.detectChanges(); // <-- force UI refresh after async
      },
      error: (err) => {
        this.loading = false;
        this.players = [];
        console.error('Failed to load players:', err);
        this.error = err?.error?.error ?? err?.message ?? 'Failed to load players.';
        this.cdr.detectChanges(); // <-- force UI refresh after async
      }
    });
  }

  formatHandicap(h: Player['handicap']): string {
    if (h === null || h === undefined || h === '') return '—';
    const n = typeof h === 'string' ? Number(h) : h;
    return Number.isFinite(n) ? n.toFixed(1) : String(h);
  }
}
