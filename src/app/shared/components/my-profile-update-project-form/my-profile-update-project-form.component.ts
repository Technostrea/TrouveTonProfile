import {Component, inject, Input, OnChanges, OnInit, output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProjectService} from "@app/core/services/project/project.service";
import {Project} from "@app/shared/models/project";
import {NgClass} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ProjectPictureFormComponent} from "@app/shared/components/project-picture-form/project-picture-form.component";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {ProjectDto} from "@app/shared/models/project-dto";

@Component({
  selector: 'app-my-profile-update-project-form',
  standalone: true,
  imports: [
    PaginatorModule,
    ReactiveFormsModule,
    NgClass,
    ProjectPictureFormComponent
  ],
  templateUrl: './my-profile-update-project-form.component.html',
  styleUrl: './my-profile-update-project-form.component.scss'
})
export class MyProfileUpdateProjectFormComponent implements OnInit, OnChanges {

  @Input({required: true}) projectId: string | null = null;

  protected project: Project | undefined = undefined
  private readonly toastrService = inject(ToastrService);
  private readonly authService = inject(AuthService);

  protected readonly projectService = inject(ProjectService);
  private readonly formBuilder = inject(FormBuilder);

  protected projectForm = this.formBuilder.group({
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    lien: new FormControl('')
  });

  formIsUpdated = output<string | null>({alias: 'formIsUpdated'})


  ngOnInit(): void {
    if (this.projectId == 'add'.toLowerCase()){
      this.projectForm.setValue({
        nom: '',
        description: '',
        lien: ''
      })
    }

    if (this.projectId != null && this.projectId != 'add'.toLowerCase()) {

      this.projectService.getProjectById(this.projectId).subscribe(
        value => {
          this.project = value;
          this.projectForm.setValue({
            nom: value.nom,
            description: value.description,
            lien: value.lien
          })
        }
      );

    }


  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }


    if (this.projectId != null && this.projectId != 'add'.toLowerCase()) {

      // Update

      this.projectService.updateProject(this.project!.id, this.projectForm.getRawValue()).subscribe(value => {

        this.formIsUpdated.emit(value.id);

        this.toastrService.success(
          `Les informations du projet ${value.nom} ont bien été modifier !`,
          `Mise à jour`,
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          }
        );

      })

    } else {

      // Create

      const projectDto: ProjectDto = {
        ...this.projectForm.getRawValue(),
        utilisateur: this.authService.user()!.record!.id
      } as ProjectDto;


      this.projectService.createProject(projectDto).subscribe(value => {

        this.formIsUpdated.emit(value.id);

        this.toastrService.success(
          `Le projet ${value.nom} a bien été créer !`,
          `Nouveau projet`,
          {
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          }
        );
      })
    }


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.projectId = changes['projectId'].currentValue;
    this.ngOnInit();
  }

}
