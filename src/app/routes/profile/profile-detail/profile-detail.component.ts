import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {QRCodeModule} from "angularx-qrcode";
import {UpperCasePipe} from "@angular/common";
import {User} from "@app/shared/models/user";
import {Profile} from "@app/shared/models/profile";
import {ChipsComponent} from "@app/shared/components/chips/chips.component";
import {ReseauxComponent} from "@app/shared/components/reseaux/reseaux.component";
import {UntilDestroy} from "@ngneat/until-destroy";
import {ProjectListComponent} from "@app/shared/components/project-list/project-list.component";
import {environment} from "@env/environment";

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    QRCodeModule,
    ChipsComponent,
    ReseauxComponent,
    RouterLink,
    UpperCasePipe,
    ProjectListComponent
  ],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
@UntilDestroy()
export class ProfileDetailComponent {

  protected readonly environment = environment;
  private readonly route = inject(ActivatedRoute);


  protected extraData: { user: User, profile: Profile } = this.route.snapshot.data['profile'];

  protected user = computed(() => {
    if (this.extraData != undefined) return this.extraData.user;
    return {} as User;
  });


  protected profile = computed(() => {
    if (this.extraData != undefined) return this.extraData.profile;
    return {} as Profile;
  });
}
