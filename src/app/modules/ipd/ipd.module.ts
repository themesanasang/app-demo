import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpdRoutingModule } from './ipd-routing.module';
import { IpdComponent } from './pages/ipd/ipd.component';
import { IpdDetailComponent } from './pages/ipd-detail/ipd-detail.component';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    IpdComponent,
    IpdDetailComponent
  ],
  imports: [
    CommonModule,
    IpdRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ]
})
export class IpdModule { }
