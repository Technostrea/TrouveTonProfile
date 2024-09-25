import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-vertical-profile-item',
  standalone: true,
  imports: [],
  templateUrl: './vertical-profile-item.component.html',
  styleUrl: './vertical-profile-item.component.scss'
})
export class VerticalProfileItemComponent {

  @Input() user: any = {};
  protected router = inject(Router)

  onShowDetail(user: any) {
    this.router.navigate(['/profiles', "user1"])
  }

}
