import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';

import {detailResolver} from './detail.resolver';
import {User} from "@app/shared/models/user";
import {Profile} from "@app/shared/models/profile";

describe('detailResolver', () => {

  let mockRoute: Partial<Router>;

  beforeEach(() => {
    mockRoute = {
      getCurrentNavigation: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRoute }
      ]
    });
  });

  it('should  return user and profile', () => {

    const mockUser : User = {
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
    const mockProfile : Profile = {
      id: "string",
      created: "string",
      updated: "string",
      profession: "string",
      utilisateur: "string",
      estVerifier: false,
      secteur: "string",
      reseaux: JSON.parse("{}"),
      bio: "string",
      cv: "string",
      projets: [],
      apropos: "string"
    };
    const fakeState = {} as any;
    const fakeParams = { params: { name: 'john_doe'} } as any;

    (mockRoute.getCurrentNavigation as jest.Mock).mockReturnValue({
      extras: {
        state: { user: mockUser, profile: mockProfile }
      }
    });

    const result = TestBed.runInInjectionContext(() => detailResolver( fakeParams, fakeState));

    expect(result).toEqual({ user: mockUser, profile: mockProfile });
    expect(mockRoute.getCurrentNavigation).toHaveBeenCalled();

  });

});
