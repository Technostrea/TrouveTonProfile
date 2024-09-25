import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchComponent} from "@app/shared/features/search/search.component";
import {
  HorizentalProfileItemComponent
} from "@app/shared/components/horizental-profile-item/horizental-profile-item.component";
import {
  VerticalProfileItemComponent
} from "@app/shared/components/vertical-profile-item/vertical-profile-item.component";
import {DisplayProfileCardComponent} from "@app/shared/features/display-profile-card/display-profile-card.component";
import {JsonPipe} from "@angular/common";
import {
  HorizentalProfileListComponent
} from "@app/shared/components/horizental-profile-list/horizental-profile-list.component";
import {
  VerticalProfileListComponent
} from "@app/shared/components/vertical-profile-list/vertical-profile-list.component";

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [
    SearchComponent,
    HorizentalProfileItemComponent,
    VerticalProfileItemComponent,
    DisplayProfileCardComponent,
    JsonPipe,
    HorizentalProfileListComponent,
    VerticalProfileListComponent
  ],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss'
})
export class ProfileListComponent {

  private readonly route = inject(ActivatedRoute);
  protected profiles = this.route.snapshot.data['profiles'];
  protected display = signal<string>('grid'.toUpperCase());

  constructor() {
    console.log(this.profiles)
  }

  showNewDisplay($event: string) {
    this.display.set($event.toUpperCase())
  }
}
