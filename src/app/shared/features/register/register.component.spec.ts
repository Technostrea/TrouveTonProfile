import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {provideRouter} from "@angular/router";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let mockToastrService: Partial<ToastrService>;
  let mockAuthService: Partial<AuthService>;
  let mockProfileService: Partial<ProfileService>;

  beforeEach(async () => {

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
    };

    mockProfileService={
      createProfile: jest.fn().mockResolvedValue(true),
    }

    mockAuthService={

    }

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ProfileService, useValue: mockProfileService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
