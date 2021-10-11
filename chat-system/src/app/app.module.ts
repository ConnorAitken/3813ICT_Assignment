import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAssisComponent } from './group-assis/group-assis.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupsComponent,
    GroupAdminComponent,
    GroupsManagementComponent,
    SuperAdminComponent,
    GroupAssisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
