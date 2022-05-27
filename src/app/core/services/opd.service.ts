import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const routes = {
    opdList: '/visit/opd',
    opdDetail: '/visit/getOPDDetail/',
    opdRegister: '/visit/opd',
    ipdRegister: '/visit/ipd',
    opdUpdate: '/visit/update',
    opdDelete: '/visit/delete/'
};

@Injectable({
  providedIn: 'root'
})
export class OPDService {
  
  constructor(private apiService: ApiService) { }

  async getOPD() {
    const _url = `${routes.opdList}`;
    return await this.apiService.get(_url).toPromise();
  }  

  async getOPDDetail(id:string) {
    const _url = `${routes.opdDetail}`+id;
    return await this.apiService.get(_url).toPromise();
  }  

  async saveOPD(data: object) {
    const _url = `${routes.opdRegister}`;
    return this.apiService.post(_url, data).toPromise();
  }

  async saveIPD(data: object) {
    const _url = `${routes.ipdRegister}`;
    return this.apiService.post(_url, data).toPromise();
  }

  async updateOPD(data: object) {
    const _url = `${routes.opdUpdate}`;
    return this.apiService.put(_url, data).toPromise();
  }

  async deleteOPD(id:string) {
    const _url = `${routes.opdDelete}`+id;
    return await this.apiService.delete(_url).toPromise();
  } 

}