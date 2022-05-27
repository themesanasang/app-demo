import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { HomeModule } from './modules/home/home.module';
import { PatientModule } from './modules/patient/patient.module';
import { OpdModule } from './modules/opd/opd.module';
import { IpdModule } from './modules/ipd/ipd.module';
import { UserModule } from './modules/user/user.module';
import { AboutModule } from './modules/about/about.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthModule } from './modules/auth/auth.module';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {ExcelService} from './shared/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,

    CoreModule,
    HomeModule,
    PatientModule,
    OpdModule,
    IpdModule,
    UserModule,
    AboutModule,
    ContactModule,
    AuthModule,

    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
