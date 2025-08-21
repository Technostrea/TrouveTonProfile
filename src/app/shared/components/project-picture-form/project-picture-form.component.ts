import {Component, inject, Input, output} from '@angular/core';
import {AuthService} from "@app/core/services/authentication/auth.service";
import {Project} from "@app/shared/models/project";
import {ProjectService} from "@app/core/services/project/project.service";
import {NgClass} from "@angular/common";
import {environment} from "@env/environment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-project-picture-form',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './project-picture-form.component.html',
  styleUrl: './project-picture-form.component.scss'
})
export class ProjectPictureFormComponent {
  @Input({required: true}) project: Project | undefined = undefined;

  onFormSubmitted = output<any>();
  private readonly projectService = inject(ProjectService);
  private readonly toastrService = inject(ToastrService);

  private readonly authService = inject(AuthService);

  file: File | null = null; // Variable to store file
  imagePreviewUrl: string | null = null; // URL for image preview

  onSubmit() {

    if (this.file != null) {
      const formData = new FormData();
      formData.append('fichier', this.file); // "fichier" est le nom du champ dans PocketBase

      this.projectService.updateProject(this.project?.id!, formData).subscribe(
        value => {
          this.authService.updateUser();

          this.toastrService.success(
            `L'aperçu du projet ${value.nom} ont bien été modifier !`,
            `Mise à jour`,
            {
              closeButton: true,
              progressAnimation: 'decreasing',
              progressBar: true
            }
          );
        }
      );

      this.onFormSubmitted.emit("");
    }
  }


  onPictureChange($event: Event) {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    if (target?.files?.[0]) {
      this.file = target.files[0];
      this.readFile(this.file);
    }
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  protected readonly environment = environment;
}
