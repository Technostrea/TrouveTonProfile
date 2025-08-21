import {ChangeDetectionStrategy, Component, inject, output, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {RegisterDto} from "@app/shared/models/register-dto";
import {UntilDestroy} from "@ngneat/until-destroy";
import {ToastrService} from "ngx-toastr";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {ProfileDto} from "@app/shared/models/profile-dto";
import {ProgressBarModule} from "primeng/progressbar";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ProgressBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
@UntilDestroy()
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly toastrService = inject(ToastrService);

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  protected registerForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
  });

  formSubmitted = output<any>()
  protected isLoading = signal<boolean>(false);

  onSubmit() {
    if (this.registerForm.invalid) {
      this.isLoading.set(false);
      return;
    }

    if (this.registerForm.get('password')?.value !== this.registerForm.get('passwordConfirm')?.value) {
      this.toastrService.info(
        `Les mots de passe ne correspondent pas.`,
        `Information`,
        {
          closeButton: true,
          progressAnimation: 'decreasing',
          progressBar: true
        }
      );
      return;
    }

    this.isLoading.set(true);
    this.registerForm.disable();

    const data = this.registerForm.getRawValue() as RegisterDto;
    this.formSubmitted.emit(data);

    this.register(data);
  }

  register(registerDto: RegisterDto){
    this.authService.register(registerDto).then((res)=>{
      if (res){
        this.createProfile(res.id,registerDto.email);
      }
    })
  }


  createProfile(userId: string, email: string) {
    const profileDto: ProfileDto = {
      profession: 'Profession non renseignée',
      utilisateur: userId,
      reseaux: {
        facebook: "",
        github: "",
        instagram: "",
        linkedIn: "",
        web: "",
        x: "",
        youTube: ""
      }
    };


    this.profileService.createProfile(profileDto).subscribe({
      next: (profile) => {
        if (profile) this.router.navigate(['/auth']).then(()=>{
          this.sendVerificationEmail(email);
        });
      },
      error: (err) => {
        this.toastrService.error(
          `Une erreur est survenue lors de la création de votre profil.`,
          `Erreur`,
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          }
        );
      }
    });
  }

  sendVerificationEmail(email: string) {
    this.authService.verifyEmail(email).then((isVerified: boolean) => {
      this.isLoading.set(false);
      this.registerForm.enable();
      if (isVerified) {
        this.toastrService.success(
          `Votre compte a bien été crée avec succès !\n Un mail vous a été envoyé à l'adresse ${email} pour confirmer votre inscription.`,
          `Inscription`,
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true,
            timeOut: 9000
          }
        );
      } else {
        console.error('Error sending verification email');
      }
    });
  }
}
