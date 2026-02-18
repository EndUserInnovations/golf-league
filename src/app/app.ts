// import { Component } from '@angular/core';
// import { DbTestComponent } from './pages/db-test/db-test';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [DbTestComponent],
//   template: `<app-db-test />`
// })
// export class AppComponent {}
import { Component } from '@angular/core';
import { Header } from './header/header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}
