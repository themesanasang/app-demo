import { Component, OnInit } from '@angular/core';
import { OPDService } from 'app/core/services';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-opd-detail',
  templateUrl: './opd-detail.component.html',
  styleUrls: ['./opd-detail.component.scss'],
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
export class OpdDetailComponent implements OnInit {

  vn: string;
  hn: string;
  cid: string;
  fullname: string;
  vstdate: string;
  vsttime: string;

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
    private opdService: OPDService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.vn = this.activeRoute.snapshot.params['id'];
    if (this.vn == null) {
      window.location.href = "opd";
    }

    this.loadData();
  }

  async loadData() {
    try {
      let rs: any = await this.opdService.getOPDDetail(this.vn);
      if (rs.ok) {
       this.vstdate = rs.result[0].vstdate;
       this.vsttime = rs.result[0].vsttime;
       this.hn = rs.result[0].hn;
       this.cid = rs.result[0].cid;
       this.fullname = rs.result[0].fullname;
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

  admitModal() {
    if ($('#modal-admit').hasClass('hidden')) {
      $('#modal-admit').removeClass("hidden");
    } else {
      $('#modal-admit').addClass("hidden");
    }
  }

  closeModal() {
    $('#modal-delete').addClass("hidden");
  }

  closeAdmitModal() {
    $('#modal-admit').addClass("hidden");
  }

  async delete() {
    try {
      let rs: any = await this.opdService.deleteOPD(this.vn);
      if (rs.ok) {
        this.closeModal();
        this.textSuccess = "ลบข้อมูลสำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "opd";
        }, 3500);
      }
    } catch (error) {
      this.textError = "ไม่สามารถลบข้อมูลได้";
      this._showToasterError()
    }
  }

  async admit() {
    try {
      let data: any = {
        hn: this.hn
      };

      let rs: any = await this.opdService.saveIPD(data);
      if (rs.ok) {
        this.closeAdmitModal();
        this.textSuccess = "Admit สำเร็จ";
        this._showToasterSuccess();
        setTimeout(() => {
          window.location.href = "opd";
        }, 3500);
      } else {
        this.textError = "ไม่สามารถ Admit ได้";
        this._showToasterError();
      }
    } catch (error) {
      this.textError = "ไม่สามารถ Admit ได้";
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
