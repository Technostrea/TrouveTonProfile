import {Component, inject, output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  loginForm = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  formSubmitted = output<any>()

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const data = this.loginForm.getRawValue();
    this.formSubmitted.emit(data);

    this.router.navigate(['/my-profile'])
  }

}
