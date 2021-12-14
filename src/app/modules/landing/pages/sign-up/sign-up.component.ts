import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  
  public showFormAtelier: boolean = false;
  public userOwnerForm: FormGroup;
  public atelierForm: FormGroup;

  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_.,;]).{8,}$/  --> #Abc1234
  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/  --> Abc12345
  // /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/  -->  abc12345

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userOwnerForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      dni: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]/),
        ]),
      ],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_.,;]).{8,}$/
          ),
        ]),
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  showNextForm(): void {
    console.log(this.userOwnerForm);
    console.log(this.userOwnerForm.valid);

    if(this.userOwnerForm.valid) this.showFormAtelier = true;
  }

  signUpUser(): void {
    console.log('call api');
  }
}
