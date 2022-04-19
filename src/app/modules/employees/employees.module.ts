import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    SharedModule,
  ]
})
export class EmployeesModule { }
