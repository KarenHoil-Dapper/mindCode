import { Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public loading: boolean = false;
 public customers: any[] = [
  {
    nombre_completo: 'Karen López',
    correo: 'karen@mail.com',
    status: 'Activo',
    curso: 'Angular Avanzado'
  },
  {
    nombre_completo: 'Juan Ross',
    correo: 'ross@mail.com',
    status: 'Inactivo',
    curso: 'JavaScript Avanzado'
  },
  {
    nombre_completo: 'Efraín',
    correo: 'efrain@mail.com',
    status: 'Completo',
    curso: 'flutter'
  }
 ]

 get activeLeadsCount(): number {
  return this.customers.filter(c => c.status === 'Activo').length;
}

get inactiveLeadsCount(): number {
  return this.customers.filter(c => c.status === 'Inactivo').length;
}

get completeLeadsCount(): number {
  return this.customers.filter(c => c.status === 'Completo').length;
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
