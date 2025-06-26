import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacityComponent } from './pages/privacity/privacity.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent},
  { path: 'terminos', component: PrivacityComponent},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
