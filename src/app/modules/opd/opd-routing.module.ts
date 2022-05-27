import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { OpdDetailComponent } from './pages/opd-detail/opd-detail.component';
import { OpdComponent } from './pages/opd/opd.component';
import { OpenVisitComponent } from './pages/open-visit/open-visit.component';

const routes: Routes = [
  {
    path: 'opd',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: OpdComponent },
    ]
  },
  {
    path: 'opd/open-visit',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: OpenVisitComponent },
    ]
  },
  {
    path: 'opd/:id/detail',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: OpdDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdRoutingModule { }
