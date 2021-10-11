import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAssisComponent } from './group-assis/group-assis.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home', component:GroupsComponent},
  {path:'group-admin', component:GroupAdminComponent},
  {path:'group-manage', component:GroupsManagementComponent},
  {path:'super-admin', component:SuperAdminComponent},
  {path:'group-assis/:groupID/:groupName', component:GroupAssisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
