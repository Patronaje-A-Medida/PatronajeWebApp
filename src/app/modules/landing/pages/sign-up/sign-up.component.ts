import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierCreate } from 'src/app/core/models/atelier-create';
import { UserOwnerCreate } from 'src/app/core/models/user-owner-create';
import { AuthService } from 'src/app/core/services/auth.service';
import { CunstomValidators } from 'src/app/core/utils/custom.validator';
import { RGXP_MID_PASSWORD_2 } from 'src/app/core/utils/regex.constants';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  isLoading: boolean = false;
  showFormAtelier: boolean = false;
  showAlert: boolean = false;

  messageAlert: string = '';
  typeAlert: string = '';

  userOwnerForm: FormGroup;
  atelierForm: FormGroup;

  private userOnwer: UserOwnerCreate;
  private atelier: AtelierCreate;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildOwnerForm();
    this.buildAtelierForm();
  }

  private buildOwnerForm() {
    this.userOwnerForm = this.formBuilder.group({
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(RGXP_MID_PASSWORD_2),
        ],
      ],
      confirmPassword: ['', [Validators.required, CunstomValidators.ComparePassword('password')]],
    });
  }

  private buildAtelierForm() {
    this.atelierForm = this.formBuilder.group({
      atelier: ['', Validators.required],
      description: ['', Validators.required],
      ruc: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      city: ['', Validators.required],
      district: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  isInvalid(controlName: string): boolean {
    const formControl = this.userOwnerForm.get(controlName) ?? this.atelierForm.get(controlName);
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.userOwnerForm.get(controlName) ?? this.atelierForm.get(controlName);
    return formControl.errors?.[validator] && formControl.touched;

    /*switch (validator) {
      case 'required':
        return formControl.errors[validator];
        break;
      case 'minlength':
        return formControl.errors[validator];
        break;
    }*/
  }

  showNextForm(): void {
    if (!this.userOwnerForm.valid) {
      this.userOwnerForm.markAllAsTouched();
      return;
    }

    const { names, lastNames, dni, email, password } = this.userOwnerForm.value;

    this.userOnwer = {
      nameUser: names,
      lastNameUser: lastNames,
      dni: dni,
      email: email,
      password: password,
      atelier: null,
    };

    this.showFormAtelier = true;
  }

  showPrevForm(): void {
    this.showFormAtelier = false;
  }

  signUpUser(): void {
    if (!this.atelierForm.valid) {
      this.atelierForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { atelier, description, ruc, city, district, address } = this.atelierForm.value;

    this.atelier = {
      nameAtelier: atelier,
      descriptionAtelier: description,
      rucAtelier: ruc,
      city: city,
      district: district,
      address: address,
    };

    this.userOnwer.atelier = this.atelier;
    this.authService.signUpOwner(this.userOnwer).subscribe(
      (_) => {
        this.messageAlert = 'Se le enviará un enlace de confirmación a su correo electrónico';
        this.typeAlert = 'success';
        this.isLoading = false;
        this.showAlert = true;
        setTimeout(
          (_) => this.router.navigate(['/home'], { relativeTo: this.route }),
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

  navigateTo(): void {
    this.router.navigate(['/sign-in'], { relativeTo: this.route });
  }

}
