import {Component, inject, Input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {ThemeService} from "@app/core/services/theme/theme.service";
import {UntilDestroy} from "@ngneat/until-destroy";

@Component({
  selector: 'app-reseaux',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './reseaux.component.html',
  styleUrl: './reseaux.component.scss'
})
@UntilDestroy()
export class ReseauxComponent {
  @Input({required: true}) reseaux: any = undefined;
  protected readonly Object = Object;
  protected themeService: ThemeService = inject(ThemeService);
}
