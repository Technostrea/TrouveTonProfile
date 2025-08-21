import {Component, Input} from '@angular/core';
import {AsyncPipe, JsonPipe, UpperCasePipe} from "@angular/common";
import {Profile} from "@app/shared/models/profile";
import {UntilDestroy} from "@ngneat/until-destroy";

@Component({
  selector: 'app-my-home-profile',
  standalone: true,
  imports: [
    UpperCasePipe,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './my-home-profile.component.html',
  styleUrl: './my-home-profile.component.scss'
})
@UntilDestroy()
export class MyHomeProfileComponent {
  @Input({required: true}) profile: Profile | undefined = undefined
}
