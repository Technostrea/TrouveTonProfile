import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileUpdateProjectFormComponent } from './my-profile-update-project-form.component';
import {AuthService} from "@app/core/services/authentication/auth.service";
import {ToastrService} from "ngx-toastr";
import {ProjectService} from "@app/core/services/project/project.service";
import {provideRouter} from "@angular/router";
import {signal} from "@angular/core";
import {Auth} from "@app/shared/models/auth";

describe('MyProfileUpdateProjectFormComponent', () => {
  let component: MyProfileUpdateProjectFormComponent;
  let fixture: ComponentFixture<MyProfileUpdateProjectFormComponent>;

  let mockProjectService: Partial<ProjectService>;
  let mockAuthService: Partial<AuthService>;
  let mockToastrService: Partial<ToastrService>;

  beforeEach(async () => {

    mockToastrService={
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn()
    }

    mockAuthService = {
        user: signal<Auth|undefined>(undefined),
    };

    mockProjectService={}

    await TestBed.configureTestingModule({
      imports: [MyProfileUpdateProjectFormComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ProjectService, useValue: mockProjectService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileUpdateProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
