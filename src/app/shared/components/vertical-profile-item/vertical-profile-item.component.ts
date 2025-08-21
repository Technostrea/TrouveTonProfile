import {Component, inject, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Profile} from "@app/shared/models/profile";
import {UserService} from "@app/core/services/user/user.service";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {UntilDestroy} from "@ngneat/until-destroy";
import {User} from "@app/shared/models/user";
import {ChipsComponent} from "@app/shared/components/chips/chips.component";
import {ReseauxComponent} from "@app/shared/components/reseaux/reseaux.component";
import {environment} from "@env/environment";

@Component({
  selector: 'app-vertical-profile-item',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    ChipsComponent,
    ReseauxComponent,
    RouterLink
  ],
  templateUrl: './vertical-profile-item.component.html',
  styleUrl: './vertical-profile-item.component.scss'
})
@UntilDestroy()
export class VerticalProfileItemComponent implements OnInit {

  @Input({required: true}) profile: Profile = {} as Profile;
  protected router = inject(Router)
  protected userService = inject(UserService);

  protected user: User | undefined = undefined;


  ngOnInit(): void {
    this.userService.getUserById(this.profile.utilisateur).subscribe(
      value => this.user = value
    )
  }

  protected readonly environment = environment;
}
