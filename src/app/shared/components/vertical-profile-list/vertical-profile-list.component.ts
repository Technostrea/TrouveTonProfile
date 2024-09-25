import { Component } from '@angular/core';
import {
    VerticalProfileItemComponent
} from "@app/shared/components/vertical-profile-item/vertical-profile-item.component";

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

}
