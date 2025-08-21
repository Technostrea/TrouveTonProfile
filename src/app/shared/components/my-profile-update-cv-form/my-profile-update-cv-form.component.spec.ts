import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileUpdateCvFormComponent } from './my-profile-update-cv-form.component';
import {ToastrService} from "ngx-toastr";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {signal} from "@angular/core";
import {Auth} from "@app/shared/models/auth";
import {provideRouter} from "@angular/router";

describe('MyProfileUpdateCvFormComponent', () => {
  let component: MyProfileUpdateCvFormComponent;
  let fixture: ComponentFixture<MyProfileUpdateCvFormComponent>;

  let mockToastrService: Partial<ToastrService>;
  let mockProfileService: Partial<ProfileService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {

    mockToastrService={
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
    }

    mockProfileService = {
      updateProfile: jest.fn().mockReturnValue({
        subscribe: jest.fn()
      })
    };

    mockAuthService = {
      updateUser: jest.fn(),
      user: signal<Auth|undefined>(undefined)
    };

    await TestBed.configureTestingModule({
      imports: [MyProfileUpdateCvFormComponent],
      providers: [
        provideRouter([]),
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileUpdateCvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
