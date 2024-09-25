import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ThemeService} from "@app/core/services/theme/theme.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  protected themeService: ThemeService = inject(ThemeService);

  toggleDarkMode() {
    this.themeService.updateDarkMode();
  }
}
