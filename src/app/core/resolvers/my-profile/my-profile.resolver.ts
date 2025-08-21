import {ResolveFn, Router} from '@angular/router';
import {User} from "@app/shared/models/user";
import {inject} from "@angular/core";

export const myProfileResolver: ResolveFn<{ user: User }> = (route, state) => {
  const router = inject(Router);
  const user: User = router.getCurrentNavigation()!.extras.state!['user'] as User;
  return {user}
};
