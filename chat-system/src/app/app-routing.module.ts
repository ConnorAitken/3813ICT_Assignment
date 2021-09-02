import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupsManagementComponent } from './groups-management/groups-management.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'account', component:AccountComponent},
  {path:'profile', component:ProfileComponent},
  {path:'groups', component:GroupsComponent},
  {path:'group-admin', component:GroupAdminComponent},
  {path:'group-manage', component:GroupsManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
