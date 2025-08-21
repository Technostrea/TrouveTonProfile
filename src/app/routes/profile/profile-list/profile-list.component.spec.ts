import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListComponent } from './profile-list.component';
import {provideRouter} from "@angular/router";

describe('ProfileListComponent', () => {
  let component: ProfileListComponent;
  let fixture: ComponentFixture<ProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileListComponent],
      providers:[
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
