import {Component, inject, output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  protected registerForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  formSubmitted = output<any>()

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const data = this.registerForm.getRawValue();
    this.formSubmitted.emit(data);

    this.router.navigate(['/auth'])
  }
}
