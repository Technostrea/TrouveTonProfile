import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProfileUpdateFormComponent} from './my-profile-update-form.component';
import {provideRouter} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";

describe('MyProfileUpdateFormComponent', () => {
  let component: MyProfileUpdateFormComponent;
  let fixture: ComponentFixture<MyProfileUpdateFormComponent>;

  let mockToastrService : Partial<ToastrService>;

  let mockProfileData = {profession:'',secteur:'',bio:'',apropos:'',reseaux:{facebook:'',github:'',instagram:'',linkedIn:'',web:'',x:'',youTube:''}};

  beforeEach(async () => {

    mockToastrService = {
      warning: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MyProfileUpdateFormComponent],
      providers: [
        FormBuilder,
        provideRouter([]),
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit invalid update form', () => {
    component.profileForm.setValue(mockProfileData);

    const spyUpdateProfile = jest.spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.profileForm.valid).toEqual(false);
    expect(spyUpdateProfile).toHaveBeenCalled();
  });

  it('should submit valid update form', () => {
    mockProfileData.profession = 'developer';
    mockProfileData.secteur = 'technology';
    mockProfileData.bio = 'A passionate developer';
    mockProfileData.apropos = 'About me';
    component.profileForm.setValue(mockProfileData);

    const spyUpdateProfile = jest.spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.profileForm.valid).toEqual(true);
    expect(spyUpdateProfile).toHaveBeenCalled();
  });
});
