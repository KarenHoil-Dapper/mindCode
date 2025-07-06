import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';

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
  ) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  formValidation() {
    if (this.loginForm.controls['correo'].errors) {
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
    this.submit(this.loginForm.value);
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

  submit(data: any){}
}
