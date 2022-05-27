import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight } from 'ng-animate';

declare var $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
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
export class UserDetailComponent implements OnInit {

  userid: string;

  checkForm: FormGroup;
  submitted = false;
  showError = false;

  //toast
  faCheckCircle = faCheckCircle;
  faXmarkCircle = faXmarkCircle;
  time: number = 5000;
  progress: string = "0%";
  showToaster: boolean = false;
  showToasterError: boolean = false;

  textSuccess: string;
  textError: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private route: Router,
  ) { 
    this.checkForm = this.createCheckForm();
  }

  ngOnInit(): void {
    this.userid = this.activeRoute.snapshot.params['id'];
    if (this.userid == null) {
      window.location.href = "user";
    }

    this.loadData();
  }

  async loadData() {
    try {
      let rs: any = await this.userService.getUserDetail(this.userid);
      if (rs.ok) {
        this.checkForm.patchValue({
          fullname: rs.result[0].fullname,
          username: rs.result[0].username,
        });    
      }
    } catch (error) {
      
    }
  }

  createCheckForm(): FormGroup {
    return this.formBuilder.group(
      {
        fullname: [null, [Validators.required]],
        username: [null, [Validators.required]],
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.checkForm.invalid) {
      return;
    }

    this.update();
  }

  async update() {
    try {
      this.showError = false;

      let fullname = this.checkForm.value.fullname;
      let username = this.checkForm.value.username;

      let data: any = {
        id: this.userid,
        fullname: fullname,
        username: username,
      };

      let rs: any = await this.userService.updateUser(data);
      if (rs.ok) {

        this.loadData();
        this.textSuccess = "บันทึกสำเร็จ";
        this._showToasterSuccess();

      } else {
        this.showError = true;
        this.textError = "ไม่สามารถบันทึกได้";
        this._showToasterError();
      }
    } catch (error) {
      this.showError = true;
      this.textError = "ไม่สามารถบันทึกได้";
      this._showToasterError();
    }
  }

  deleteModal() {
    if ($('#modal-delete').hasClass('hidden')) {
      $('#modal-delete').removeClass("hidden");
    } else {
      $('#modal-delete').addClass("hidden");
    }
  }

  closeModal() {
    $('#modal-delete').addClass("hidden");
  }

  async delete() {
    try {
      let rs: any = await this.userService.deleteUser(this.userid);
      if (rs.ok) {
        this.closeModal();
        this.textSuccess = "ลบข้อมูลสำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "user";
        }, 3500);
      }
    } catch (error) {
      this.textError = "ไม่สามารถลบข้อมูลได้";
      this._showToasterError()
    }
  }

  _showToasterSuccess() {
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

  _showToasterError() {
    this.progress = "0%"
    this.showToasterError = true
    let timeElapsed = 0
    const interval = setInterval(() => {
      timeElapsed += 10
      const progress = timeElapsed / this.time * 100
      this.progress = `${progress}%`
      if (timeElapsed >= this.time) {
        this.showToasterError = false
        clearInterval(interval)
      }
    }, 10)
  }

}
