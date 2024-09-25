import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkModeSignal = signal<string>('null');

  updateDarkMode() {
    this.darkModeSignal.update((value) => (value === 'dark' ? 'null' : 'dark'));
  }

}
