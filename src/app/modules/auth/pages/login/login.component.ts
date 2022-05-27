import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from 'app/core/services';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  checkForm: FormGroup;
  submitted = false;
  showError = false;
  jwtHelper = new JwtHelperService();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {
    this.checkForm = this.createCheckForm();
   }

  ngOnInit(): void {
  }

  createCheckForm(): FormGroup {
    return this.formBuilder.group(
      {
        username: [null, [Validators.required]],
        password: ['', [Validators.required,]],
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.checkForm.invalid) {
      return;
    }

    this.login();
  }

  async login() {
    try {
      this.showError = false;
      let username = this.checkForm.value.username;
      let password = this.checkForm.value.password; 

      let data: any = {
        username: username,
        password: password
      };

      let rs: any = await this.authService.doLogin(data);
      if (rs.ok) {
        this.localStorage.set('token', rs.token, environment.timeout, 'm');
        const decoded: any = this.jwtHelper.decodeToken(rs.token);

        this.localStorage.set('usename', decoded.usename, environment.timeout, 'm')
        this.localStorage.set('fullname', decoded.fullname, environment.timeout, 'm')
        this.localStorage.set('status', 'login', environment.timeout, 'm');  

        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/opd']));
        window.scrollTo(0, 0);
      } else {
        this.showError = true;
      }
    } catch (error) {
      this.showError = true;
    }
  }

}
