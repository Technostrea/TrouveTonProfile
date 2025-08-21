import {Component, Input} from '@angular/core';
import {
  VerticalProfileItemComponent
} from "@app/shared/components/vertical-profile-item/vertical-profile-item.component";
import {Profile} from "@app/shared/models/profile";

@Component({
  selector: 'app-vertical-profile-list',
  standalone: true,
  imports: [
    VerticalProfileItemComponent
  ],
  templateUrl: './vertical-profile-list.component.html',
  styleUrl: './vertical-profile-list.component.scss'
})
export class VerticalProfileListComponent {
  @Input({required: true}) profiles: Profile[] = []
}
