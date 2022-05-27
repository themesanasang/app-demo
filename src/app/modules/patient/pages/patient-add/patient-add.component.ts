import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'app/core/services';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight } from 'ng-animate';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
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
export class PatientAddComponent implements OnInit {

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
    private patientService: PatientService,
  ) { 
    this.checkForm = this.createCheckForm();
  }

  ngOnInit(): void {
    this.checkForm.patchValue({
      sex: 1,
    });
  }

  createCheckForm(): FormGroup {
    return this.formBuilder.group(
      {
        hn: [null, [Validators.required]],
        cid: [null, [Validators.required]],
        fullname: [null, [Validators.required]],
        sex: [null, [Validators.required]],
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.checkForm.invalid) {
      return;
    }

    this.save();
  }


  async save() {
    try {
      let hn = this.checkForm.value.hn;
      let fullname = this.checkForm.value.fullname;
      let cid = this.checkForm.value.cid;
      let sex = this.checkForm.value.sex; 

      let data: any = {
        hn: hn,
        fullname: fullname,
        cid: cid,
        sex: sex
      };

      let rs: any = await this.patientService.savePatient(data);
      if (rs.ok) {
        this.textSuccess = "บันทึกสำเร็จ";
        this._showToasterSuccess();

        setTimeout(() => {
          window.location.href = "patient";
        }, 3300);

      } else {
        this.textError = "ไม่สามารถบันทึกได้";
        this._showToasterError();
      }
    } catch (error) {
      this.textError = "ไม่สามารถบันทึกได้";
      this._showToasterError();
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
