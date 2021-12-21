import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierCreate } from 'src/app/core/models/atelier-create';
import { UserOwnerCreate } from 'src/app/core/models/user-owner-create';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  showFormAtelier: boolean = false;
  showAlert: boolean = false;

  messageAlert: string = '';
  typeAlert: string = '';

  userOwnerForm: FormGroup;
  atelierForm: FormGroup;

  private userOnwer: UserOwnerCreate;
  private atelier: AtelierCreate;

  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_.,;]).{8,}$/  --> #Abc1234
  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/  --> Abc12345
  // /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/  -->  abc12345

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(10)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_.,;]).{8,}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });

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

  showNextForm(): void {
    if (!this.userOwnerForm.valid) return;

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
    if (!this.atelierForm.valid) return;

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
        this.messageAlert = 'Registro exitoso';
        this.typeAlert = 'success';
        this.showAlert = true;
        setTimeout((_) => this.router.navigate(['/home'], { relativeTo: this.route }),4000);
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );
  }

}
