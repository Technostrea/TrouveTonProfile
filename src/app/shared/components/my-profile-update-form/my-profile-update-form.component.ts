import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UntilDestroy} from "@ngneat/until-destroy";
import {Profile} from "@app/shared/models/profile";
import {NgClass} from "@angular/common";
import {SectorService} from "@app/core/services/sector/sector.service";
import {Sector} from "@app/shared/models/sector";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {
  MyProfileUpdateCvFormComponent
} from "@app/shared/components/my-profile-update-cv-form/my-profile-update-cv-form.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-profile-update-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MyProfileUpdateCvFormComponent
  ],
  templateUrl: './my-profile-update-form.component.html',
  styleUrl: './my-profile-update-form.component.scss'
})
@UntilDestroy()
export class MyProfileUpdateFormComponent implements OnInit {

  private readonly toastrService = inject(ToastrService);

  @Input({required: true}) profile: Profile = {} as Profile;
  private readonly formBuilder = inject(FormBuilder);
  protected readonly sectorService = inject(SectorService);
  protected readonly profileService = inject(ProfileService);
  protected readonly authService = inject(AuthService);
  profileForm!: FormGroup;
  protected sectors = signal<Sector[]>([]);


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      profession: new FormControl(this.profile.profession?this.profile.profession.toLowerCase():'', [Validators.required]),
      secteur: new FormControl<string|null>(this.profile.secteur ? this.profile.secteur.toLowerCase() : null, [Validators.required]),
      bio: new FormControl(this.profile.bio ? this.profile.bio.toLowerCase() : ''),
      apropos: new FormControl(this.profile.apropos ? this.profile.apropos.toLowerCase() : ''),
      reseaux: new FormGroup({
        facebook: new FormControl(this.profile.reseaux ? (this.profile.reseaux as any)["facebook"] : ''),
        github: new FormControl(this.profile.reseaux ?(this.profile.reseaux as any)["github"] : ''),
        instagram: new FormControl(this.profile.reseaux ? (this.profile.reseaux as any)["instagram"] : ''),
        linkedIn: new FormControl(this.profile.reseaux ? (this.profile.reseaux as any)["linkedIn"] : ''),
        web: new FormControl(this.profile.reseaux ? (this.profile.reseaux as any)["web"]: ''),
        x: new FormControl(this.profile.reseaux ? (this.profile.reseaux as any)["x"] : ''),
        youTube: new FormControl(this.profile.reseaux ? (this.profile.reseaux as any)["youTube"] : '')
      })
    });

    if (this.profile.secteur) {
      this.sectorService.getSectorById(this.profile.secteur).subscribe(value => this.profileForm.get("secteur")!.setValue(value.id));
    }

    this.sectorService.sectors.subscribe(value => this.sectors.set(value));

  }


  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const data: Profile = {
      profession: this.profileForm.getRawValue().profession,
      secteur: this.profileForm.getRawValue().secteur,
      apropos: this.profileForm.getRawValue().apropos,
      bio: this.profileForm.getRawValue().bio,
      reseaux: this.profileForm.getRawValue().reseaux
    } as Profile

    this.profileService.updateProfile(this.profile.id, data).subscribe({
        next: (value) => {
          this.authService.updateUser();

          this.toastrService.success(
            ` Vos informations personnelles ont bien été modifier !`,
            `Mise à jour`,
            {
              closeButton: true,
              progressAnimation: 'decreasing',
              progressBar: true
            }
          );
        },
        error: (error) => {
          this.toastrService.error("Une erreur est survenue lors de la mise à jour de votre profil", "Erreur");
        }
      }
    );

  }

}
