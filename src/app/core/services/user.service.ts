import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const routes = {
    userList: '/users/getUser',
    userDetail: '/users/getUserDetail/',
    userRegister: '/users/save',
    userUpdate: '/users/update',
    userDelete: '/users/delete/'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private apiService: ApiService) { }

  async getUser() {
    const _url = `${routes.userList}`;
    return await this.apiService.get(_url).toPromise();
  }  

  async getUserDetail(id:string) {
    const _url = `${routes.userDetail}`+id;
    return await this.apiService.get(_url).toPromise();
  }  

  async saveUser(data: object) {
    const _url = `${routes.userRegister}`;
    return await this.apiService.post(_url, data).toPromise();
  }

  async updateUser(data: object) {
    const _url = `${routes.userUpdate}`;
    return await this.apiService.put(_url, data).toPromise();
  }

  async deleteUser(id:string) {
    const _url = `${routes.userDelete}`+id;
    return await this.apiService.delete(_url).toPromise();
  } 

}