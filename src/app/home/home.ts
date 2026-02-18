import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Players } from '../players/players';
import { Hero } from "../hero/hero";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, Players],
  templateUrl: `./home.html`,
  styleUrls: [`./home.scss`]
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }
}
