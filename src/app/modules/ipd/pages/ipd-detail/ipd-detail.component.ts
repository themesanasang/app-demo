import { Component, OnInit } from '@angular/core';
import { IPDService } from 'app/core/services';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-ipd-detail',
  templateUrl: './ipd-detail.component.html',
  styleUrls: ['./ipd-detail.component.scss'],
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
export class IpdDetailComponent implements OnInit {

  an: string;
  hn: string;
  fullname: string;
  regdate: string;
  regtime: string;
  dchdate: string;
  dchtime: string;

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
    private ipdService: IPDService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.an = this.activeRoute.snapshot.params['id'];
    if (this.an == null) {
      window.location.href = "ipd";
    }

    this.loadData();
  }

  async loadData() {
    try {
      let rs: any = await this.ipdService.getIPDDetail(this.an);
      if (rs.ok) {
       this.regdate = rs.result[0].regdate;
       this.regtime = rs.result[0].regtime;
       this.hn = rs.result[0].hn;
       this.fullname = rs.result[0].fullname;
       this.dchdate = rs.result[0].dchdate;
       this.dchtime = rs.result[0].dchtime;
      }
    } catch (error) {
      
    }
  }

  deleteModal() {
    if ($('#modal-delete').hasClass('hidden')) {
      $('#modal-delete').removeClass("hidden");
    } else {
      $('#modal-delete').addClass("hidden");
    }
  }

  dischargeModal() {
    if ($('#modal-discharge').hasClass('hidden')) {
      $('#modal-discharge').removeClass("hidden");
    } else {
      $('#modal-discharge').addClass("hidden");
    }
  }

  closeModal() {
    $('#modal-delete').addClass("hidden");
  }

  closeDischargeModal() {
    $('#modal-discharge').addClass("hidden");
  }

 
  async delete() {
    try {
      let rs: any = await this.ipdService.deleteIPD(this.an);
      if (rs.ok) {
        this.closeModal();
        this.textSuccess = "ลบข้อมูลสำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "ipd";
        }, 3500);
      }
    } catch (error) {
      this.textError = "ไม่สามารถลบข้อมูลได้";
      this._showToasterError()
    }
  }

  async discharge() {
    try {
      let data: any = {
        an: this.an
      };

      let rs: any = await this.ipdService.discharge(data);
      if (rs) {
        this.closeDischargeModal();
        this.textSuccess = "จำหน่าย สำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "ipd";
        }, 3500);
      } else {
        this.textError = "ไม่สามารถ จำหน่าย ได้";
        this._showToasterError();
      }
    } catch (error) {
      this.textError = "ไม่สามารถ จำหน่าย ได้";
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
