import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isLoading: boolean = false;
  showAlert: boolean = false;

  messageAlert: string = '';
  typeAlert: string = '';

  resetPwdForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildResetPwdForm();
  }

  private buildResetPwdForm(): void {
    this.resetPwdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isInvalid(controlName: string): boolean {
    const formControl = this.resetPwdForm.get(controlName);
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.resetPwdForm.get(controlName);
    return formControl.errors?.[validator] && formControl.touched;
  }

  resetPassword(): void {
    if (this.resetPwdForm.invalid) return;
    let userEmail = this.resetPwdForm.controls['email'].value;
    this.authService.resetPassword(userEmail).subscribe(
      (res) => {
        this,this.isLoading = false;
        this.messageAlert = 'Se enviará un correo con las nuevas credenciales para el acceso a la aplicación.';
        this.typeAlert = 'success';
        this.showAlert = true;
        this.resetPwdForm.reset();
        setTimeout(() => {
          this.navigateTo('sign-in');
        }, 2000);
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.isLoading = false;
        this.showAlert = true;
        this.resetPwdForm.reset();
      }
    );
  }

  navigateTo(target: string, path: string = '../'): void {
    this.router.navigate([path + target], {relativeTo: this.route});
  }

}
