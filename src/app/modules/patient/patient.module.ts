import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { PatientAddComponent } from './pages/patient-add/patient-add.component';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PatientComponent,
    PatientDetailComponent,
    PatientAddComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ]
})
export class PatientModule { }
