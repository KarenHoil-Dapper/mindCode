import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public isLoading: boolean = false;
  public invalid: boolean = false;
  public invalidFlag: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  formValidation() {
    if (this.loginForm.controls['mail'].errors) {
      this.invalidFlag = 'invalid-email';
      this.invalid = true;
    }
    if (this.loginForm.controls['password'].errors) {
      this.invalidFlag = 'invalid-password';
      this.invalid = true;
    }
    if (this.loginForm.invalid) {
      this.invalidFlag = 'invalid-all';
      setTimeout(() => {
        this.resetValidations();
      }, 3000);
      return;
    }
    this.submit(this.loginForm.value.mail, this.loginForm.value.password);
  }

  resetValidations(flag?: string) {
    this.invalid = false;
    this.invalidFlag = '';
  }

  errorMessage(formControl: string): any {
    if (this.loginForm.get(formControl)?.hasError('required')) {
      return `* Requerido.`;
    } else {
      if (this.loginForm.get(formControl)?.hasError('pattern')) {
        return `Email inválido`;
      } else {
        return `Inválido`;
      }
    }
  }

  submit( mail: string, password: string ) {
  this.isLoading = true;
    try {
      const response = this.authService.login(mail, password);
      this.isLoading = false;
    this.router.navigate(['/dashboard']);
  } catch (error) {
    this.isLoading = false;
    this.toastService.showError('Error al iniciar sesión', 'Por favor, inténtalo de nuevo más tarde.');
    console.error('Error en el inicio de sesión:', error);
  }
  }
}
