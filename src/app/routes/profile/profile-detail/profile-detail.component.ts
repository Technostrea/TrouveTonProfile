import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent {

  private readonly route = inject(ActivatedRoute);
  protected profile = this.route.snapshot.data['profile'];

  constructor() {
    console.log(this.profile)
  }
}
