import { ResolveFn } from '@angular/router';

export const detailResolver: ResolveFn<string> = (route, state) => {
    const paramValue = route.params['name'];
    return "profile-list-resolver works!, paramValue: " + paramValue || "no query value found!";
};
