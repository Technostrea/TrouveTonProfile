import { ResolveFn } from '@angular/router';

export const listResolver: ResolveFn<string> = (route, state) => {
  const queryValue = route.queryParams['search'];
  return "profile-list-resolver works!, queryValue: " + queryValue || "no query value found!";
};
