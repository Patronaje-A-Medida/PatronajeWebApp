import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagedResponse } from 'src/app/core/models/generics/paged-response';
import { UserTechnicianRead } from 'src/app/core/models/users/user-technician-read';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  firstLoad: boolean;
  isLoading: boolean;
  messageAlert: string;
  typeAlert: string;
  showAlert: boolean = false;

  private _TechniciansSub: Subscription;
  technicians: Array<UserTechnicianRead>;
  techniciansa: Array<UserTechnicianRead>;
  pageNumber: number = 1;
  pageSize: number = 5;
  fromItem: number;
  toItem: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllTechnicians(true);

  }

  private getAllTechnicians(firstLoad?: boolean): void {
    this.firstLoad = firstLoad ?? false;
    this.isLoading = true;

    this._TechniciansSub = this.authService.getAllByAtelierId().subscribe(
      (res) => {
        this.technicians = res.map((tuser) => {
          return {
            email: tuser.email,
            nameUser: tuser.nameUser,
            lastNameUser: tuser.lastNameUser,
            dni: tuser.dni
          };});
        this.firstLoad = false;
        this.isLoading = false;
        this.computeItems();
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );

  }

  createEmployee(): void {
    this.router.navigate(['/employees/create'], { relativeTo: this.route });
  }

  private computeItems() {
    return;
  }

}
