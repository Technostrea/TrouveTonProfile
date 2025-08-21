import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ThemeService} from "@app/core/services/theme/theme.service";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {environment} from "@env/environment";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
@UntilDestroy()
export class NavBarComponent implements OnInit {
  protected themeService: ThemeService = inject(ThemeService);
  protected authService = inject(AuthService);


  toggleDarkMode() {
    this.themeService.updateDarkMode();
  }

  ngOnInit(): void {
    this.authService.updateUser();
  }

  protected readonly environment = environment;
}
