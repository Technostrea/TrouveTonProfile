import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from "@app/core/services/authentication/auth.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {provideRouter} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Mocks des services
  let mockAuthService: Partial<AuthService>;
  let mockToastrService: Partial<ToastrService>;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn()
    };
    mockToastrService = {
      warning: jest.fn(),
      success: jest.fn(),
      error: jest.fn()
    };


    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        FormBuilder,
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalid form if empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call onSubmit action and nothing if form is invalid', () => {
      component.loginForm.setValue({ email: '', password: '' });
      const spyLogin = jest.spyOn(component, 'login');
      component.onSubmit();
      expect(spyLogin).not.toHaveBeenCalled();
  });

  it('should submit form and call login ', () => {
    // Spion sur l'EventEmitter formSubmitted
    const emitSpy = jest.spyOn(component.formSubmitted, 'emit');

    let loginDto = { email: 'test@test.com', password: '123456' };
    component.loginForm.setValue(loginDto);

    // Mock login retourne une Promise réussie
    (mockAuthService.login as jest.Mock).mockResolvedValue({ isValid: true, record: { name: 'John', email: 'test@test.com' } });

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' });
    // login est appelée
    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' });

  });

  it('should make warning toast if invalid login and password ', async () => {
    (mockAuthService.login as jest.Mock).mockResolvedValue({ isValid: false });

    await component.login({email: 'fail@test.com', password: 'fail'});

    expect(mockToastrService.warning).toHaveBeenCalledWith(
      'Vous devez vérifier votre adresse e-mail avant de vous connecter.',
      'Erreur de connexion',
      {
        closeButton: true,
        progressAnimation: 'decreasing',
        progressBar: true
      }
    );
  });


  it('should make succes toast if valid login and password', async () => {
    const user = { name: 'John', email: 'john@test.com' };
    (mockAuthService.login as jest.Mock).mockResolvedValue({ isValid: true, record: user });

     await component.login({ email: 'john@test.com', password: 'pass' });

    expect(mockToastrService.success).toHaveBeenCalledWith(
      `Bienvenue ${user.name?user.name:user.email}!`,
      'Connexion',
      {
        closeButton: true,
        progressAnimation: 'decreasing',
        progressBar: true
      }
    );
  });

  it('should make error toast if wrong login or password', async () => {
    (mockAuthService.login as jest.Mock).mockRejectedValue(new Error('fail'));

    await component.login({ email: 'fail@test.com', password: 'fail' });

    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Identifiants incorrects. Veuillez réessayer.',
      'Erreur de connexion',{
        closeButton: true,
        progressAnimation: 'decreasing',
        progressBar: true
      }
    );
  });



});
