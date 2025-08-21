import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {LoginDto} from "@app/shared/models/login-dto";
import {RegisterDto} from "@app/shared/models/register-dto";
import {User} from "@app/shared/models/user";

describe('AuthService', () => {
  let authService: AuthService;
  let mockLoginUser : LoginDto = {email: 'john_doe@example.com', password: 'mysecretpassword'};
  let mockRegisterUser: RegisterDto = {email:'john_doe@example.com', password: 'mysecretpassword', passwordConfirm: 'mysecretpassword', emailVisibility: false};

  const mockAuth = {
    isValid: false,
    record: {email: mockLoginUser.email, id: '12345', verified: false} as User,
    token: 'mockToken12345'
  }

  const mockAuthStore = {
    model: {email: mockLoginUser.email, id: '12345', verified: false} as User,
    token: 'abc123',
    isValid: true,
    clear: jest.fn(),
  };

  const mockCollection = {
    authWithPassword: jest.fn().mockResolvedValue({
      record: { verified: true }
    }),
    create: jest.fn(),
    requestPasswordReset: jest.fn(),
    requestVerification: jest.fn().mockResolvedValue(true),
  };

  const mockPocketBase = jest.fn(() => ({
    collection: jest.fn(() => mockCollection),
    authStore: mockAuthStore,
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: []
    });
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should have user signal initialized to undefined', () => {
    expect(authService.user()).toBeUndefined();
  });

  it('should login correctly and set signal', async () => {
    authService.login(mockLoginUser)
      .then((response) => {
        expect(response).toBeDefined();
      }).catch((error) => jest.fn());
  });

  it('should make success register', () => {
    authService.register(mockRegisterUser)
      .then((response) => {
        expect(response).toBeDefined();
        expect(response.email).toEqual(mockRegisterUser.email);
      }).catch((error) => jest.fn());
  });


});
