import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from "@app/shared/components/nav-bar/nav-bar.component";
import {FooterComponent} from "@app/shared/components/footer/footer.component";
import {ThemeService} from '@app/core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TrouveTonProfile';
  themeService = inject(ThemeService);
}
