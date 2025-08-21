import {Component, inject, Input, output} from '@angular/core';
import {User} from "@app/shared/models/user";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {UserService} from "@app/core/services/user/user.service";
import {environment} from "@env/environment";
import {NgClass} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-avatar-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './user-avatar-form.component.html',
  styleUrl: './user-avatar-form.component.scss'
})
export class UserAvatarFormComponent {

  private readonly toastrService = inject(ToastrService);
  protected readonly environment = environment;
  @Input({required: true}) user: User | undefined = undefined;

  onFormSubmitted = output<any>();
  private userService = inject(UserService);

  private authService = inject(AuthService);

  file: File | null = null; // Variable to store file
  imagePreviewUrl: string | null = null; // URL for image preview

  onUserAvatarFormSubmit() {

    if (this.file != null) {
      const formData = new FormData();
      formData.append('avatar', this.file); // "avatar" est le nom du champ dans PocketBase

      this.userService.updateUser(this.user?.id!, formData).subscribe({
        next: value => {
          this.authService.updateUser();

          this.toastrService.success(
            `Votre photo de profile a bien été modifier !`,
            `Mise à jour`,
            {
              closeButton: true,
              progressAnimation: 'decreasing',
              progressBar: true
            }
          );
        },
        error: error => {
          this.toastrService.error(
            `Une erreur est survenue lors de la mise à jour de votre photo de profile !`,
            `Erreur`,
            {
              closeButton: true,
              progressAnimation: 'decreasing',
              progressBar: true
            }
          );
        }
      });
      this.onFormSubmitted.emit("");
    }
  }


  onPictureChange($event: Event) {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    if (target?.files?.[0]) {
      this.file = target.files[0];
      this.readFile(this.file);
    }
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
