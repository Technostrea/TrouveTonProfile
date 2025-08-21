import {ChangeDetectionStrategy, Component, inject, output, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {LoginDto} from "@app/shared/models/login-dto";
import {UntilDestroy} from '@ngneat/until-destroy';
import {User} from "@app/shared/models/user";
import {ToastrService} from "ngx-toastr";
import {ProgressBarModule} from 'primeng/progressbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ProgressBarModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
@UntilDestroy()
export class LoginComponent {
  private authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  formSubmitted = output<any>()
  protected isLoading = signal<boolean>(false);

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    this.loginForm.disable();

    const data = this.loginForm.getRawValue() as LoginDto;

    this.formSubmitted.emit(data);

    this.login(data);

  }

  login(loginDto: LoginDto) {

    this.authService.login(loginDto).then((res) => {
      this.loginForm.patchValue({password: ''})
      this.loginForm.enable();
      this.isLoading.set(false);

      if(!res.isValid) {
        this.toastrService.info(
          'Vous devez vérifier votre adresse e-mail avant de vous connecter.',
          'Information de connexion',
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          }
        );
        return;
      }

      if (res.isValid) {
        this.toastrService.success(
          `Bienvenue ${res.record.name ? res.record.name : res.record.email}!`,
          `Connexion`,
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          }
        );
        this.router.navigate(['/my-profile'], {state: {user: res.record as User}});
      }
    }).catch((error) => {
      this.loginForm.patchValue({password: ''})
      this.loginForm.enable();
      this.isLoading.set(false);

      this.toastrService.error(
        'Identifiants incorrects. Veuillez réessayer.',
        'Erreur de connexion',
        {
          closeButton: true,
          progressAnimation: 'decreasing',
          progressBar: true
        }
      );
    });
  }

}
