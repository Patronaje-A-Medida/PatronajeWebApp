import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/core/models/auth/user-login';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isLoading: boolean = false;
  showAlert: boolean = false;

  messageAlert: string = '';
  typeAlert: string = '';

  loginForm: FormGroup;

  private userLogin: UserLogin;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  isInvalid(controlName: string): boolean {
    const formControl = this.loginForm.get(controlName);
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.loginForm.get(controlName);
    return formControl.errors?.[validator] && formControl.touched;
  }

  signInUser(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.userLogin = { email: email, password: password };
    this.authService.signInUser(this.userLogin).subscribe(
      (_) => {
        this.isLoading = false;
        this.navigateTo('dashboard');
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.isLoading = false;
        this.showAlert = true;
      }
    );
  }

  navigateTo(target: string, path: string = '../'): void {
    this.router.navigate([path + target], {relativeTo: this.route});
  }

}
