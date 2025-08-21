import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideRouter} from "@angular/router";
import {ThemeService} from "@app/core/services/theme/theme.service";

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'TrouveTonProfile' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TrouveTonProfile');
  });

});
