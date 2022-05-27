import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const routes = {
    authLogin: '/login',
    authRegister: '/users/save'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiService: ApiService) { }

  async register(data: object) {
    const _url = `${routes.authRegister}`;
    return this.apiService.post(_url, data).toPromise();
  }

  async doLogin(data: object) {
    const _url = `${routes.authLogin}`;
    return this.apiService.post(_url, data).toPromise();
  }

}