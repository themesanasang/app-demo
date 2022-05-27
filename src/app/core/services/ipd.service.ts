import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const routes = {
    ipdList: '/visit/ipd',
    ipdDetail: '/visit/getIPDDetail/',
    discharge: '/visit/discharge',
    ipdDelete: '/visit/ipd/delete/'
};

@Injectable({
  providedIn: 'root'
})
export class IPDService {
  
  constructor(private apiService: ApiService) { }

  async getIPD() {
    const _url = `${routes.ipdList}`;
    return await this.apiService.get(_url).toPromise();
  }  

  async getIPDDetail(id:string) {
    const _url = `${routes.ipdDetail}`+id;
    return await this.apiService.get(_url).toPromise();
  }  

  async discharge(data: object) {
    const _url = `${routes.discharge}`;
    return this.apiService.put(_url, data).toPromise();
  }

  async deleteIPD(id:string) {
    const _url = `${routes.ipdDelete}`+id;
    return await this.apiService.delete(_url).toPromise();
  } 

}