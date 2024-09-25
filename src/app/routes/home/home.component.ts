import {Component, inject} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SearchComponent} from "@app/shared/features/search/search.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FaIconComponent,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly router = inject(Router)

  showNewQuery(newQuery: string) {
    this.router.navigate(['/profiles'], {queryParams: {search: newQuery}});
  }
}
