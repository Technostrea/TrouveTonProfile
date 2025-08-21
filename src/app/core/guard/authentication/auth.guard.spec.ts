import {TestBed} from '@angular/core/testing';

import {authGuard} from './auth.guard';
import {AuthService} from "@app/core/services/authentication/auth.service";
import {signal} from "@angular/core";
import {Auth} from "@app/shared/models/auth";
import {CanActivateFn, Router} from '@angular/router';

describe('authGuard', () => {
  let mockAuthService: Partial<AuthService>;
  let mockRouter: Partial<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockAuthService= {
      user: signal<Auth | undefined>({ isValid: true, token: 'mockToken', record: null })
    }

    mockRouter ={
      parseUrl: jest.fn()
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access if user is valid', () => {
    const mockRoute = {} as any;
    const mockState = {} as any;

    const result =TestBed.runInInjectionContext(() => executeGuard(mockRoute, mockState));
    expect(result).toEqual(true);
  });

  it('should redirect to /auth if user is not valid', () => {
    mockAuthService.user!.set({ isValid: false, token: '', record: null });
    const mockRoute = {} as any;
    const mockState = {} as any;

    (mockRouter.parseUrl as  jest.Mock).mockReturnValue('/auth');

    const result = TestBed.runInInjectionContext(() => executeGuard(mockRoute, mockState));

    expect(result).toEqual("/auth" as any);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith("/auth");

  });
});
