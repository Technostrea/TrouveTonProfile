import {Component, inject, Input, OnInit} from '@angular/core';
import {AuthService} from "@app/core/services/authentication/auth.service";
import {ProjectService} from "@app/core/services/project/project.service";
import {Project} from "@app/shared/models/project";
import {environment} from "@env/environment";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-profile-project-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './my-profile-project-item.component.html',
  styleUrl: './my-profile-project-item.component.scss'
})
export class MyProfileProjectItemComponent implements OnInit {

  protected readonly environment = environment;
  @Input({required: true}) projectId: string = '';
  protected authService = inject(AuthService);

  protected projectService = inject(ProjectService);

  protected project: Project | undefined = undefined

  ngOnInit(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      value => this.project = value
    );
  }
}
