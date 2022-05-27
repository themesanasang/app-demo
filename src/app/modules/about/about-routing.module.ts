import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: 'about',
    component: MainLayoutComponent,
    children: [
        { path: '', component: AboutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
