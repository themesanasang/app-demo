import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpdRoutingModule } from './opd-routing.module';
import { OpdComponent } from './pages/opd/opd.component';
import { OpdDetailComponent } from './pages/opd-detail/opd-detail.component';
import { OpenVisitComponent } from './pages/open-visit/open-visit.component';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    OpdComponent,
    OpdDetailComponent,
    OpenVisitComponent
  ],
  imports: [
    CommonModule,
    OpdRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AutocompleteLibModule
  ]
})
export class OpdModule { }
