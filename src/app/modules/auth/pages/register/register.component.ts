import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from 'app/core/services';
import Validation from '@app/shared/custom-validators';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight, fadeInDown } from 'ng-animate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('showToasterAnimation', [
      state('show', style({})),
      state('hide', style({
        opacity: 0,
        // display: 'none'
      })),
      transition('hide => show', useAnimation(bounceInRight, {
          params: {
            timing: 2
          }
        }
      )),
      transition('show => hide', useAnimation(bounceOutRight, {
          params: {
            timing: 2
          }
        }
      )),
    ])
  ]
})
export class RegisterComponent implements OnInit {

  checkForm: FormGroup;
  submitted = false;
  showError = false;

  //toast
  faCheckCircle = faCheckCircle
  time: number = 5000
  progress: string = "0%"
  showToaster: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) { 
    this.checkForm = this.createCheckForm();
  }

  ngOnInit(): void {
  }

  createCheckForm(): FormGroup {
    return this.formBuilder.group(
      {
        fullname: [null, [Validators.required]],
        username: [null, [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmpassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmpassword')]
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.checkForm.invalid) {
      return;
    }

    this.register();
  }

  async register() {
    try {
      this.showError = false;

      let fullname = this.checkForm.value.fullname;
      let username = this.checkForm.value.username;
      let password = this.checkForm.value.password; 

      let data: any = {
        fullname: fullname,
        username: username,
        password: password
      };

      let rs: any = await this.authService.register(data);
      if (rs.ok) {
        this._showToaster();

        setTimeout(() => {
          window.location.href = "login";
          //this.route.navigate(['/login']);
        }, 3400);

      } else {
        this.showError = true;
      }
    } catch (error) {
      this.showError = true;
    }
  }

  _showToaster() {
    this.progress = "0%"
    this.showToaster = true
    let timeElapsed = 0
    const interval = setInterval(() => {
      timeElapsed += 10
      const progress = timeElapsed / this.time * 100
      this.progress = `${progress}%`
      if (timeElapsed >= this.time) {
        this.showToaster = false
        clearInterval(interval)
      }
    }, 10)
  }

}
