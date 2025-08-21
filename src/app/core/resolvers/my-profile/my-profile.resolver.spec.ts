import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';

import {myProfileResolver} from './my-profile.resolver';
import {User} from "@app/shared/models/user";

describe('myProfileResolver', () => {

  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockRouter = {
      getCurrentNavigation: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

  });

  it('should return the user from navigation extras state', () => {
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

    // Mocke la méthode getCurrentNavigation pour retourner un objet attendu
    (mockRouter.getCurrentNavigation as jest.Mock).mockReturnValue({
      extras: {
        state: {
          user
        }
      }
    });

    const result = TestBed.runInInjectionContext(() => myProfileResolver(null as any, null as any));

    expect(result).toEqual({ user });
    expect(mockRouter.getCurrentNavigation).toHaveBeenCalled();
  });

});
