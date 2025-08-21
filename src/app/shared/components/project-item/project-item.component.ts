import {Component, Input} from '@angular/core';
import {Project} from "@app/shared/models/project";
import {JsonPipe} from "@angular/common";
import {environment} from "@env/environment";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink
  ],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss'
})
export class ProjectItemComponent {
  protected readonly environment = environment;

  @Input({required: true}) project: Project | undefined = undefined;

}
