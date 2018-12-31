import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HerosComponent} from './heros/heros.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailsComponent} from './hero-details/hero-details.component';

const routes: Routes = [
  {
    path: 'heros',
    component: HerosComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    component: HeroDetailsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
