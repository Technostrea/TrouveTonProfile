import {Component, computed, Input} from '@angular/core';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {Profile} from "@app/shared/models/profile";
import {environment} from '@env/environment';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    PdfViewerModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent {
  @Input({required:true}) profile : Profile | undefined = undefined;
  protected readonly environment = environment;
  protected readonly cv_link = computed(() => {
    return `${environment.baseUrl}/api/files/profiles/${this.profile!.id}/${this.profile!.cv}`
  })

}
