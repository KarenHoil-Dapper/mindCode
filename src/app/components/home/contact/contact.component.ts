import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastService } from '../../../services/toast/toast.service';
import { ContactService } from '../../../services/contact/contact.service';
import { CoursesService } from '../../../services/courses/courses.service';
import { response } from 'express';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)', opacity: 0 }),
        animate('150ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('150ms', style({ transform: 'translateY(-50%)', opacity: 0 }))
      ])
    ]
    )
  ]
})
export class ContactComponent {

  public contactForm!: FormGroup;
  public isLoading: boolean = false;
  public invalid: boolean = false;
  public invalidFlag: string = '';
  public invalidCaptcha: string = '';
  public visible: boolean = false;
  public courses: any;
  public courseSelected:any;
  public courseId:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private contactService: ContactService,
    private coursesService: CoursesService
  ) {
    this.contactForm = this.formBuilder.group({
      nombre_completo: ['', Validators.required],
      telefono: ['', Validators.required],
      Cursos_id: [''],
      correo: ['', [Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$')]],
      mensaje: [''],
    });
  }

  async ngOnInit() {
    await this.getCourses();
  }

  formValidation() {
    if (this.contactForm.controls['nombre_completo'].errors) {
      this.invalidFlag = 'invalid-name';
      this.invalid = true;
    }
    if (this.contactForm.controls['telefono'].errors) {
      this.invalidFlag = 'invalid-phone';
      this.invalid = true;
    }
    if (this.contactForm.controls['correo'].errors) {
      this.invalidFlag = 'invalid-email';
      this.invalid = true;
    }
    if (this.contactForm.invalid) {
      this.invalidFlag = 'invalid-all';
      setTimeout(() => {
        this.resetValidations();
      }, 3000);
      return;
    }
    this.submit(this.contactForm.value);
  }

  resetValidations(flag?: string) {
    this.invalid = false;
    this.invalidFlag = '';
  }

  errorMessage(formControl: string): any {
    if (this.contactForm.get(formControl)?.hasError('required')) {
      return `* Requerido.`;
    } else {
      if (this.contactForm.get(formControl)?.hasError('pattern')) {
        return `Email inválido`;
      } else {
        return `Inválido`;
      }
    }
  }

  async getCourses(){
    try{
      let response = await this.coursesService.getCourses();
      this.courses = response;
      this.courseSelected = this.courses.find((space: any) => space.id);
      console.log(response);
      return response;
    }catch(error: any) {
      this.toastService.showError('Ha ocurrido un error inesperado al cargar los cursos');
      console.log(error);
      throw error;
    }
  }
  onSelectCourse(event: any) {
    console.log(event);
  }


  async submit(formValue: any) {
    this.isLoading = true;
    this.invalidCaptcha = '';
    try {
      this.recaptchaV3Service.execute('importantAction').subscribe(async (token: string) => {
        formValue.token = token;
        this.isLoading = true;
        try {
          console.log('Enviando formulario de contacto', formValue);
          formValue.Cursos_id = this.courseSelected.id;
          let response = await this.contactService.sendContact(formValue);
          this.visible = true;
          this.contactForm.reset();
          this.isLoading = false;
        } catch (error: any) {
          this.toastService.showError('Ha ocurrido un error inesperado');
          console.log(error);
          this.isLoading = false;
          if (error.status === 200) {
            this.invalidCaptcha = 'La verificación del captcha ha fallado.';
          }
        }
      });
    } catch (error) {
      this.toastService.showError('Ha ocurrido un error inesperado');
      console.log(error);
    }
  }

}
