import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {User} from "@app/shared/models/user";
import {AsyncPipe, JsonPipe, Location, NgClass, UpperCasePipe} from "@angular/common";
import {UntilDestroy} from "@ngneat/until-destroy";
import {SafeUrl} from "@angular/platform-browser";
import {QRCodeModule} from "angularx-qrcode";
import {environment} from "@env/environment";
import {ChipsComponent} from "@app/shared/components/chips/chips.component";
import {ReseauxComponent} from "@app/shared/components/reseaux/reseaux.component";
import {UpdateUserComponent} from "@app/shared/features/update-user/update-user.component";
import {
  MyProfileProjectListComponent
} from "@app/shared/components/my-profile-project-list/my-profile-project-list.component";
import {MyHomeProfileComponent} from "@app/shared/components/my-home-profile/my-home-profile.component";
import {
  MyProfileUpdateFormComponent
} from "@app/shared/components/my-profile-update-form/my-profile-update-form.component";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {Profile} from "@app/shared/models/profile";
import {PdfViewerComponent} from "@app/shared/features/pdf-viewer/pdf-viewer.component";

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    AsyncPipe,
    QRCodeModule,
    ChipsComponent,
    ReseauxComponent,
    UpdateUserComponent,
    UpperCasePipe,
    MyProfileProjectListComponent,
    RouterOutlet,
    MyHomeProfileComponent,
    MyProfileUpdateFormComponent,
    NgClass,
    PdfViewerComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
@UntilDestroy()
export class MyProfileComponent implements OnInit {

  private profileService = inject(ProfileService);

  protected readonly environment = environment;
  protected menu = signal<string>("home");

  protected myProfileQrCode: string = `${environment.production}`;
  protected qrCodeDownloadLink: SafeUrl = `${environment.production}`;

  protected location = inject(Location);
  protected readonly route = inject(ActivatedRoute);

  protected extraData: { user: User } = this.route.snapshot.data['user'];

  protected user = computed(() => {
    if (this.extraData != undefined) return this.extraData.user;
    return {} as User;
  });

  protected profile: Profile = {} as Profile;

  protected isEditMode = signal<boolean>(false);

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  onCancelEditMode($event: boolean) {
    this.isEditMode.set(!$event);
  }

  ngOnInit(): void {
    this.myProfileQrCode = `${this.myProfileQrCode}/profiles/${this.user().id}`;

    this.profileService.getProfileByUserId(this.user().id).subscribe({
      next: (value: Profile) => {
        this.profile = value;
      }
    });
  }
}
