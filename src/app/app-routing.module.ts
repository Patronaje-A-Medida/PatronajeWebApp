import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/layouts/base-layout/base-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  /*{
    path: '', 
    component: BaseLayoutComponent,
    children: [
      {path:'', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)}
    ]
  },*/
  {
    path: '', 
    component: BaseLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: '', loadChildren: () => import('./modules/catalogue/catalogue.module').then(m => m.CatalogueModule) },
      { path: '', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) },
      { path: '', loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule) },
    ]
  },
  /*{
    path: '',
    component: DashboardLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/catalogue/catalogue.module').then(m => m.CatalogueModule) }
    ]
  },*/
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
