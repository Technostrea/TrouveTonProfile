import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {
  MyProfileProjectItemComponent
} from "@app/shared/components/my-profile-project-item/my-profile-project-item.component";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {ProjectService} from "@app/core/services/project/project.service";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {Project} from "@app/shared/models/project";
import {UntilDestroy} from "@ngneat/until-destroy";
import {
  MyProfileUpdateProjectFormComponent
} from "@app/shared/components/my-profile-update-project-form/my-profile-update-project-form.component";

@Component({
  selector: 'app-my-profile-project-list',
  standalone: true,
  imports: [
    MyProfileProjectItemComponent,
    PaginatorModule,
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe,
    MyProfileUpdateProjectFormComponent
  ],
  templateUrl: './my-profile-project-list.component.html',
  styleUrl: './my-profile-project-list.component.scss'
})
@UntilDestroy()
export class MyProfileProjectListComponent implements OnInit {
  @Input({required: true}) projectIds: string[] = [];
  @Input({required: true}) userId: string = "";
  protected projectService = inject(ProjectService);
  protected projectIdSelected = signal<string|null>(null);


  protected projects: Project[] = []

  ngOnInit(): void {
    this.projectService.getProjectByUserId(this.userId).subscribe(
      value => this.projects = value
    );
  }

  onProjectFormSubmitted($event: string | null) {
    this.projectIdSelected.set(null)
  }
}
