import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  imports: [CardComponent, CommonModule]
})
export class CardListComponent {

  @Input() abertas: Location[] = [];

}
