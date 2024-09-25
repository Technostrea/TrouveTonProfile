import {Component, inject, output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  onSearchChange = output<string>()
  private formBuilder: FormBuilder = inject(FormBuilder);

  searchForm = this.formBuilder.group({
    search: new FormControl('', Validators.required)
  });

  onSubmit(){
    if (this.searchForm.invalid) {
      return;
    }
    const search = this.searchForm.value.search?.toLowerCase()!;
    this.setNewName(search);
  }

  setNewName(newName: string) {
    this.onSearchChange.emit(newName);
  }

}
