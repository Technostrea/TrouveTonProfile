import {Component, inject, Input, output} from '@angular/core';
import {User} from "@app/shared/models/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "@app/core/services/user/user.service";
import {AuthService} from "@app/core/services/authentication/auth.service";

@Component({
  selector: 'app-user-password-form',
  standalone: true,
  imports: [],
  templateUrl: './user-password-form.component.html',
  styleUrl: './user-password-form.component.scss'
})
export class UserPasswordFormComponent {
  @Input({required: true}) user :User | undefined = undefined;
  onFormSubmitted = output<any>();

  private userService = inject(UserService);
  private authService = inject(AuthService);

  private fb = inject(FormBuilder);

  protected userPasswordForm = this.fb.group({
    password: new FormControl('',[Validators.required]),
    passwordConfirm: new FormControl('',[Validators.required]),
    oldPassword: new FormControl('',[Validators.required]),
  });

  onUserPasswordFormSubmit(){
    if (this.userPasswordForm.invalid){
      return;
    }

    const data = this.userPasswordForm.getRawValue();

    this.onFormSubmitted.emit(data);
  }

}
