import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { PatientAddComponent } from './pages/patient-add/patient-add.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { PatientComponent } from './pages/patient/patient.component';

const routes: Routes = [
  {
    path: 'patient',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: PatientComponent },
    ]
  },
  {
    path: 'patient/add',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: PatientAddComponent },
    ]
  },
  {
    path: 'patient/:id/detail',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: PatientDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
