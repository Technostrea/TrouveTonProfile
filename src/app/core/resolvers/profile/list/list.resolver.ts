import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProfileService} from "@app/core/services/profile/profile.service";
import {Observable} from "rxjs";
import {Profile} from "@app/shared/models/profile";

export const listResolver: ResolveFn<Observable<Profile[]>> = (route, state) => {
  const queryValue = route.queryParams['search'];
  const profileService = inject(ProfileService);

  return profileService.profiles;
};
