import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierCreate } from 'src/app/core/models/ateliers/atelier-create';
import { UserTechnicianCreate } from 'src/app/core/models/users/user-technician-create';
import { AuthService } from 'src/app/core/services/auth.service';
import { CunstomValidators } from 'src/app/core/utils/custom.validator';
import { RGXP_MID_PASSWORD_2 } from 'src/app/core/utils/regex.constants';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  isLoading: boolean = false;
  showAlert: boolean = false;

  messageAlert: string = '';
  typeAlert: string = '';

  userTechnicalForm: FormGroup;

  private userTechnical: UserTechnicianCreate;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.buildTechnicalForm();
  }

  private buildTechnicalForm() {
    this.userTechnicalForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isInvalid(controlName: string): boolean {
    const formControl = this.userTechnicalForm.get(controlName) 
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.userTechnicalForm.get(controlName) 
    return formControl.errors?.[validator] && formControl.touched;
  }

  navigateTo(): void {
    this.router.navigate(['/employees'], { relativeTo: this.route });
  }

  signUpUser(): void {
    if (!this.userTechnicalForm.valid) {
      this.userTechnicalForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { names, lastNames, dni, email } = this.userTechnicalForm.value;
    this.userTechnical = {
      email: email,
      nameUser: names,
      lastNameUser: lastNames,
      dni: dni,
      bossId: 0,
      atelierId: 0
    }

    this.authService.signUpTechnicia(this.userTechnical).subscribe(
      (_) => {
        this.messageAlert = 'Se le enviará un enlace de confirmación a su correo electrónico';
        this.typeAlert = 'success';
        this.isLoading = false;
        this.showAlert = true;
        setTimeout(
          (_) => this.router.navigate(['/employees'], { relativeTo: this.route }),
          4000
        );
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.isLoading = false;
        this.showAlert = true;
      }
    );
  }
}
