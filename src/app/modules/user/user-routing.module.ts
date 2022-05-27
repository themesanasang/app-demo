import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: UserComponent },
    ]
  },
  {
    path: 'user/add',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: UserAddComponent },
    ]
  },
  {
    path: 'user/:id/detail',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: UserDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
