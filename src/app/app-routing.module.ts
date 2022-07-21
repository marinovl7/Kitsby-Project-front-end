import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }, {
    path: "authentication", component: AuthComponent
  },
  {
    path: 'home', component: HomeComponent
  }, {
    path: 'terms-and-conditions', component: TermsComponent
  }, {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard]
  }, {
    path: 'tasks', component: TasksComponent
  }, {
    path: '**', component: ErrorComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
