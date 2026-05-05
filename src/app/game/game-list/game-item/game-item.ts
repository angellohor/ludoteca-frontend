import { Component, Input } from '@angular/core';
import { Game } from '../../model/Game';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-game-item',
  imports: [MatCardModule],
  templateUrl: './game-item.html',
  styleUrl: './game-item.scss',
})
export class GameItem {
  @Input() game: Game;
}
