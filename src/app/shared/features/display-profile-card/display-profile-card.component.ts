import {Component, output} from '@angular/core';

@Component({
  selector: 'app-display-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './display-profile-card.component.html',
  styleUrl: './display-profile-card.component.scss'
})
export class DisplayProfileCardComponent {
  onDisplayChange = output<string>();
}
