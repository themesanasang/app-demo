import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OPDService, PatientService } from 'app/core/services';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight } from 'ng-animate';

@Component({
  selector: 'app-open-visit',
  templateUrl: './open-visit.component.html',
  styleUrls: ['./open-visit.component.scss'],
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
export class OpenVisitComponent implements OnInit {

  checkForm: FormGroup;
  submitted = false;
  showError = false;

  hn: string;
  cid: string;
  fullname: string;

  //toast
  faCheckCircle = faCheckCircle;
  faXmarkCircle = faXmarkCircle;
  time: number = 5000;
  progress: string = "0%";
  showToaster: boolean = false;
  showToasterError: boolean = false;

  textSuccess: string;
  textError: string;

  name: any;
  maxnumber = 3;
  dataPatient: any;
  public placeholder: string = 'เลือก HN';
  public keyword = 'hn';
  
  constructor(
    private opdService: OPDService,
    private patientService: PatientService,
  ) { }

  ngOnInit(): void {
    this.loadDataPatient();
  }

  async loadDataPatient() {
    try {
      let rs: any = await this.patientService.getPatient();
      if (rs.ok) {
        this.dataPatient = rs.result;
      }
    } catch (error) {
      
    }
  }

  async selectNameEvent(item: any) {  
    if(item != null) {
      try {
        let rs: any = await this.patientService.getPatientDetail(item.hn);
        if (rs.ok) {
         this.hn = rs.result[0].hn;
         this.cid = rs.result[0].cid;
         this.fullname = rs.result[0].fullname;
        }
      } catch (error) {
        
      }
    }
  }

  onSubmit() {
   if (this.hn == '' || this.hn == null) {
      this.textError = "ไม่สามารถ ส่งตรวจ ได้";
      this._showToasterError();
   } else {
    this.open();
   }
  }

  async open() {
    try{
      let data: any = {
        hn: this.hn
      };

      let rs: any = await this.opdService.saveOPD(data);
      if (rs.ok) {
        this.textSuccess = "ส่งตรวจสำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "opd";
        }, 3400);
      } else {
        this.textError = "ไม่สามารถ ส่งตรวจ ได้";
        this._showToasterError();
      }
    } catch (error) {
      this.textError = "ไม่สามารถ ส่งตรวจ ได้";
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
