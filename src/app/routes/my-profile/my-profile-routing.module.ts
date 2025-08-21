import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from "@app/routes/my-profile/my-profile.component";
import {myProfileResolver} from "@app/core/resolvers/my-profile/my-profile.resolver";

const routes: Routes = [
  {
    path: '', component: MyProfileComponent, resolve: {user: myProfileResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule {
}
