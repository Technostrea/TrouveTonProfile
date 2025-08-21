import {Component, inject, Input, OnInit, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "@app/shared/models/user";
import {NgClass} from "@angular/common";
import {UserService} from "@app/core/services/user/user.service";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
@UntilDestroy()
export class UserFormComponent implements OnInit{

  private readonly toastrService = inject(ToastrService);

  @Input({required: true}) user:User | undefined = undefined;
  onFormSubmitted = output<any>();

  private userService = inject(UserService);
  private authService = inject(AuthService);

  private fb = inject(FormBuilder);
  protected userForm! : FormGroup


  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: new FormControl(this.user?.name!.split(' ').slice(0, -1).join(' ') ?? '',[Validators.required]),
      name: new FormControl(this.user?.name!.split(' ').slice(-1)[0] ?? '',[Validators.required]),
    });
  }


  onUserFormSubmit(){
    if (this.userForm.invalid){
      return;
    }

    const data  = {
      username: this.userForm.getRawValue()!.firstname!.split(' ')[0]+this.userForm.getRawValue()!.name!,
      name :  this.userForm.getRawValue()!.firstname!+" "+this.userForm.getRawValue()!.name!,
    } as User;

    this.userService.updateUser(this.user?.id!,data).subscribe(
      value => {
        this.authService.updateUser();

        this.toastrService.success(
          `Vos informations personnelles ont bien été modifier !`,
          `Mise à jour`,
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          }
        );
      }
    )

    this.onFormSubmitted.emit(data);
  }


}
