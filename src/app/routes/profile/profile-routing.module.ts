import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileListComponent} from "@app/routes/profile/profile-list/profile-list.component";
import {ProfileDetailComponent} from "@app/routes/profile/profile-detail/profile-detail.component";
import {listResolver} from "@app/core/resolvers/profile/list/list.resolver";
import {detailResolver} from "@app/core/resolvers/profile/detail/detail.resolver";

const routes: Routes = [
  {path: '', component: ProfileListComponent, title: 'Liste des profiles', resolve: {profiles: listResolver}},
  {path: ':name', component: ProfileDetailComponent, title: 'Detail du profile', resolve: {profile: detailResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
