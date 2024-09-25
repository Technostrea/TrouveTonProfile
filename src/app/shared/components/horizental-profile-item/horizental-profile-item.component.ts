import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-horizental-profile-item',
  standalone: true,
  imports: [],
  templateUrl: './horizental-profile-item.component.html',
  styleUrl: './horizental-profile-item.component.scss'
})
export class HorizentalProfileItemComponent {

  @Input() user: any = {};
  protected router = inject(Router)

  onShowDetail(user: any) {
    this.router.navigate(['/profiles', "user1"])
  }
}
