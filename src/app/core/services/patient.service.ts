import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const routes = {
    patientList: '/patient/getPatient',
    patientDetail: '/patient/getPatientDetail/',
    patientRegister: '/patient/save',
    patientUpdate: '/patient/update',
    patientDelete: '/patient/delete/'
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  constructor(private apiService: ApiService) { }

  async getPatient() {
    const _url = `${routes.patientList}`;
    return await this.apiService.get(_url).toPromise();
  }  

  async getPatientDetail(id:string) {
    const _url = `${routes.patientDetail}`+id;
    return await this.apiService.get(_url).toPromise();
  }  

  async savePatient(data: object) {
    const _url = `${routes.patientRegister}`;
    return this.apiService.post(_url, data).toPromise();
  }

  async updatePatient(data: object) {
    const _url = `${routes.patientUpdate}`;
    return this.apiService.put(_url, data).toPromise();
  }

  async deletePatient(id:string) {
    const _url = `${routes.patientDelete}`+id;
    return await this.apiService.delete(_url).toPromise();
  } 

}