import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {UserService} from "@app/core/services/user/user.service";
import {provideRouter} from "@angular/router";
import {FormBuilder} from "@angular/forms";

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  let mockToastrService: Partial<ToastrService>;
  let mockAuthService: Partial<AuthService>;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {

    mockToastrService = {
      warning: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    };

    mockAuthService = {
      updateUser: jest.fn()
    };

    mockUserService = {
      updateUser: jest.fn().mockReturnValue({
        subscribe: jest.fn()
      })
    };

    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers:[
        provideRouter([]),
        FormBuilder,
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
