import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import {ThemeService} from "@app/core/services/theme/theme.service";
import {AuthService} from "@app/core/services/authentication/auth.service";
import { provideRouter } from '@angular/router';
import {signal} from "@angular/core";
import {Auth} from "@app/shared/models/auth";
import {User} from "@app/shared/models/user";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockThemeService: Partial<ThemeService>;
  let mockAuthService: Partial<AuthService>;

  const user: User = {
    id: 'adbc123',
    username: "john_doe",
    verified: true,
    emailVisibility: false,
    email: "jd@example.com",
    created: new Date().toString(),
    updated: new Date().toString(),
    name: "john doe",
    avatar: ""
  };
  const mockUser : Auth =  {isValid:false, record: user, token: "mockToken123"} as Auth;

  beforeEach(async () => {
    mockAuthService={
      updateUser: jest.fn(),
      user: signal<Auth | undefined>(mockUser),
      isAuthenticated: jest.fn().mockReturnValue(true),
      isEmailVerified: jest.fn().mockReturnValue(true)
    }
    mockThemeService = {
      darkModeSignal: signal<string>('null'),
      updateDarkMode: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: mockThemeService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call authService.updateUser on ngOnInit', () => {
    expect(mockAuthService.updateUser).toHaveBeenCalled();
  });

  it('should call themeService.updateDarkMode when toggleDarkMode called', () => {
    component.toggleDarkMode();
    expect(mockThemeService.updateDarkMode).toHaveBeenCalled();
  });



});
