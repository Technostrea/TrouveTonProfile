import {Component, inject, Input, output} from '@angular/core';
import {AuthService} from "@app/core/services/authentication/auth.service";
import {Profile} from "@app/shared/models/profile";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {NgClass} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-profile-update-cv-form',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './my-profile-update-cv-form.component.html',
  styleUrl: './my-profile-update-cv-form.component.scss'
})
export class MyProfileUpdateCvFormComponent {

  @Input({required: true}) profile: Profile | undefined = undefined;

  private readonly profileService = inject(ProfileService);
  private readonly toastrService = inject(ToastrService);

  private readonly authService = inject(AuthService);

  file: File | null = null; // Variable to store file

  onSubmit() {

    if (this.file != null) {
      const formData = new FormData();
      formData.append('cv', this.file); // "avatar" est le nom du champ dans PocketBase

      this.profileService.updateProfile(this.profile?.id!, formData).subscribe(
        value => {
          this.authService.updateUser();

          this.toastrService.success(
            ` Votre CV a bien été modifier !`,
            `Mise à jour`,
            {
              closeButton: true,
              progressAnimation: 'decreasing',
              progressBar: true
            }
          );

        }
      )

    }
  }


  onFileChange($event: Event) {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    if (target?.files?.[0]) {
      this.file = target.files[0];
    }
  }

}
