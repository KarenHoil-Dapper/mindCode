import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacityComponent } from './pages/privacity/privacity.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent},
  { path: 'terminos', component: PrivacityComponent},
  { path: 'login', component: LoginComponent},
   { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
