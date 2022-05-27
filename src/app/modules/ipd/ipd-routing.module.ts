import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { IpdDetailComponent } from './pages/ipd-detail/ipd-detail.component';
import { IpdComponent } from './pages/ipd/ipd.component';

const routes: Routes = [
  {
    path: 'ipd',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: IpdComponent },
    ]
  },
  {
    path: 'ipd/:id/detail',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: IpdDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdRoutingModule { }
