import {Component, Input, output} from '@angular/core';
import {User} from "@app/shared/models/user";
import {UserFormComponent} from "@app/shared/components/user-form/user-form.component";
import {UserAvatarFormComponent} from "@app/shared/components/user-avatar-form/user-avatar-form.component";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    UserFormComponent,
    UserAvatarFormComponent
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  @Input({required: true}) user: User | undefined = undefined;
  onFormSubmitted = output<any>();
  isCancelEditMode = output<boolean>();

}
