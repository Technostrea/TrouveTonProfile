import {Component, Input} from '@angular/core';
import {
    HorizentalProfileItemComponent
} from "@app/shared/components/horizental-profile-item/horizental-profile-item.component";
import {Profile} from "@app/shared/models/profile";

@Component({
  selector: 'app-horizental-profile-list',
  standalone: true,
    imports: [
        HorizentalProfileItemComponent
    ],
  templateUrl: './horizental-profile-list.component.html',
  styleUrl: './horizental-profile-list.component.scss'
})
export class HorizentalProfileListComponent {
  @Input({required:true}) profiles: Profile[] = []
}
