import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAvatarFormComponent} from './user-avatar-form.component';
import {provideRouter} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "@app/core/services/authentication/auth.service";
import {UserService} from "@app/core/services/user/user.service";

describe('UserAvatarFormComponent', () => {
  let component: UserAvatarFormComponent;
  let fixture: ComponentFixture<UserAvatarFormComponent>;

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
      imports: [UserAvatarFormComponent],
      providers: [
        provideRouter([]),
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
