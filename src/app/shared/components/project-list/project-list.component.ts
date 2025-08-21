import {Component, inject, Input, OnInit} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {ProjectItemComponent} from "@app/shared/components/project-item/project-item.component";
import {JsonPipe} from "@angular/common";
import {ProjectService} from "@app/core/services/project/project.service";
import {Project} from "@app/shared/models/project";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    ProjectItemComponent,
    JsonPipe
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
@UntilDestroy()
export class ProjectListComponent implements  OnInit{
  @Input({required: true}) userProjectId: string = "";

  protected readonly projectService = inject(ProjectService);

  protected projects: Project[]  = []

  ngOnInit(): void {
    this.projectService.getProjectByUserId(this.userProjectId).subscribe(
      value => this.projects = value
    );
  }
}
