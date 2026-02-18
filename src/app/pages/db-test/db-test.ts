import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Health } from '../../services/health';

@Component({
  selector: 'app-db-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <div class="p-4 border rounded-3">
        <h2 class="mb-3">Database Connection Test</h2>

        <div class="d-flex gap-2">
          <button class="btn btn-secondary" (click)="runHealth()" [disabled]="loading">
            {{ loading ? 'Testing...' : 'Run /health' }}
          </button>

          <button class="btn btn-primary" (click)="runDb()" [disabled]="loading">
            {{ loading ? 'Testing...' : 'Run /health/db' }}
          </button>

          <button class="btn btn-success" (click)="runPlayers()" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Load Players' }}
          </button>
        </div>

        <div *ngIf="resultText" class="mt-4">
          <div class="small text-muted mb-2">Result:</div>
          <pre class="bg-light p-3 rounded border" style="white-space: pre-wrap; margin:0;">{{ resultText }}</pre>
        </div>
      </div>
    </div>
  `
})
export class DbTestComponent {
  loading = false;
  resultText = '';

  constructor(
    private health: Health,
    private cdr: ChangeDetectorRef
  ) {}

  private setResult(value: unknown) {
    try {
      this.resultText = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    } catch {
      this.resultText = String(value);
    }
    this.cdr.detectChanges(); // <-- force UI update
  }

  runHealth() {
    this.loading = true;
    this.resultText = '';
    this.cdr.detectChanges();

    this.health.health().subscribe({
      next: (res) => {
        console.log('HEALTH OK', res);
        this.loading = false;
        this.setResult(res);
      },
      error: (err) => {
        console.error('HEALTH FAIL', err);
        this.loading = false;
        this.setResult(err?.error ?? err);
      }
    });
  }

  runDb() {
    this.loading = true;
    this.resultText = '';
    this.cdr.detectChanges();

    this.health.testDb().subscribe({
      next: (res) => {
        console.log('DB OK', res);
        this.loading = false;
        this.setResult(res);
      },
      error: (err) => {
        console.error('DB FAIL', err);
        this.loading = false;
        this.setResult(err?.error ?? err);
      }
    });
  }

  runPlayers() {
    this.loading = true;
    this.resultText = '';
    this.cdr.detectChanges();

    this.health.getPlayers().subscribe({
      next: (res) => {
        console.log('Players Returned', res);
        this.loading = false;
        this.setResult(res);
      },
      error: (err) => {
        console.log('Players Error', err);
        this.loading = false;
        this.setResult(err?.error ?? err);
      }
    });
  }

}
