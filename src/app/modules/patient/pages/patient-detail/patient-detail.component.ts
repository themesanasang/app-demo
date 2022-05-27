import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '@app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight } from 'ng-animate';

declare var $: any;

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
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
export class PatientDetailComponent implements OnInit {

  patientHN: string;

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
    private activeRoute: ActivatedRoute,
    private route: Router,
  ) {
    this.checkForm = this.createCheckForm();
   }

  ngOnInit(): void {
    this.patientHN = this.activeRoute.snapshot.params['id'];
    if (this.patientHN == null) {
      window.location.href = "patient";
    }

    this.loadData();
  }

  async loadData() {
    try {
      let rs: any = await this.patientService.getPatientDetail(this.patientHN);
      if (rs.ok) {
        this.checkForm.patchValue({
          cid: rs.result[0].cid,
          fullname: rs.result[0].fullname,
          sex: rs.result[0].sex,
        });    
      }
    } catch (error) {
      
    }
  }


  createCheckForm(): FormGroup {
    return this.formBuilder.group(
      {
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

    this.update();
  }

  async update() {
    try {
      let hn = this.patientHN;
      let fullname = this.checkForm.value.fullname;
      let cid = this.checkForm.value.cid;
      let sex = this.checkForm.value.sex; 

      let data: any = {
        hn: hn,
        fullname: fullname,
        cid: cid,
        sex: sex
      };

      let rs: any = await this.patientService.updatePatient(data);
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
      let rs: any = await this.patientService.deletePatient(this.patientHN);
      if (rs.ok) {
        this.closeModal();
        this.textSuccess = "ลบข้อมูลสำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "patient";
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
