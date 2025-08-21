import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileDetailComponent} from './profile-detail.component';
import {provideRouter} from "@angular/router";

describe('ProfileDetailComponent', () => {
  let component: ProfileDetailComponent;
  let fixture: ComponentFixture<ProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailComponent],
      providers:[
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
