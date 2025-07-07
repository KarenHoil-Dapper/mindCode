import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ContactService } from '../../services/contact/contact.service';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public loading: boolean = false;
  public leads: any;
  public courses: any;
  public course:string = '';

 constructor(
  private contactsService: ContactService,
  private toasService: ToastService,
  private coursesService: CoursesService,
  private toastService: ToastService,
  private datePipe: DatePipe
 ) {}

ngOnInit() {
  this.initData();
}

async initData() {
  await this.getCourses();
  await this.getLeads();
}



formatFecha(fecha: string): string | null {
  return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm');
}

 async getCourses() {
  try {
    const response = await this.coursesService.getCourses();
    this.courses = response.data || response; // depende cómo venga
  } catch (error: any) {
    this.toastService.showError('Error', 'No se pudieron cargar los cursos');
    console.log(error);
  }
}


async getLeads() {
  try {
    const response = await this.contactsService.getContact();
    this.leads = (response.data || response).map((lead: any) => {
      const curso = this.courses.find((c: any) => c.id === lead.Cursos_id);
      return {
        ...lead,
        nombre_curso: curso ? curso.nombre : 'Curso desconocido'
      };
    });
  } catch (error) {
    this.toasService.showError('Error', 'No se pudieron obtener los leads');
    console.error('Error fetching leads:', error);
  }
}



  getSeverity(status: string) {
        switch (status) {
            case 'Completo':
                return 'success';
            case 'Activo':
                return 'info';
            case 'Inactivo':
                return 'secondary';
            default:
                return 'warning';
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
