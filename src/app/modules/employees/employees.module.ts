import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { EmployeesComponent } from './pages/employees/employees.component';


@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
  ]
})
export class EmployeesModule { }
