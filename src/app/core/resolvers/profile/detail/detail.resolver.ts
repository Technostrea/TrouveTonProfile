import {ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {User} from "@app/shared/models/user";
import {Profile} from "@app/shared/models/profile";

export const detailResolver: ResolveFn<{ user:User,profile:Profile }> = (route, state) => {
    const paramValue = route.params['name'];
    const router = inject(Router);
    return router.getCurrentNavigation()?.extras.state as { user:User,profile:Profile }
};
