import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPictureFormComponent } from './project-picture-form.component';
import {provideRouter} from "@angular/router";
import {ProjectService} from "@app/core/services/project/project.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "@app/core/services/authentication/auth.service";

describe('ProjectPictureFormComponent', () => {
  let component: ProjectPictureFormComponent;
  let fixture: ComponentFixture<ProjectPictureFormComponent>;

  let mockProjectService: Partial<ProjectService>;
  let mockToastrService: Partial<ToastrService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockProjectService = {
      updateProject: jest.fn().mockReturnValue({
        subscribe: jest.fn()
      })
    };
    mockToastrService={
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
    }
    mockAuthService = {
      updateUser: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProjectPictureFormComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectService, useValue: mockProjectService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPictureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
