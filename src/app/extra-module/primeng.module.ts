import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

const primengComponents: any[] = [
  SidebarModule,
  IconFieldModule,
  InputIconModule,
  InputTextModule,
  DropdownModule,
  ButtonModule,
  TooltipModule,
  AutoCompleteModule,
  ScrollPanelModule,
  DividerModule,
  GalleriaModule,
  CheckboxModule,
  TableModule,
  ImageModule,
  BadgeModule,
  MultiSelectModule,
  AccordionModule,
  PanelMenuModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  OverlayPanelModule,
  DialogModule,
  ProgressSpinnerModule,
  BlockUIModule
]

@NgModule({
  declarations: [],
  imports: [
    primengComponents,
  ],
  exports: [
    primengComponents
  ]
})
export class PrimengModule { }
