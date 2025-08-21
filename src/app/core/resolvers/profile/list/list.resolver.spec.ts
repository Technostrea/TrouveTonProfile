import { TestBed } from '@angular/core/testing';
import {ResolveFn, Router} from '@angular/router';

import { listResolver } from './list.resolver';
import {Profile} from "@app/shared/models/profile";
import {myProfileResolver} from "@app/core/resolvers/my-profile/my-profile.resolver";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {Observable, of} from "rxjs";

describe('listResolver', () => {

  let mockProfileService: Partial<ProfileService>;

  beforeEach(() => {

    mockProfileService = {
      profiles: of([] as Profile[])
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProfileService, useValue: mockProfileService }
      ]
    });
  });

  it('should return profiles observable from ProfileService', () => {
    const fakeRoute ={ queryParams: { search: '' } } as any;
    const fakeState = {} as any;

    const expectedProfiles = [] as Profile[];

    const result$ : Observable<Profile[]> = TestBed.runInInjectionContext(() => listResolver(fakeRoute, fakeState) as Observable<Profile[]>);

    result$.subscribe((result:any) => {
      expect(result).toEqual(expectedProfiles);
      expect(mockProfileService.profiles).toBeDefined();
    });
  });

});
