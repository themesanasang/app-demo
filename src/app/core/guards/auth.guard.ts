import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private router: Router,
        private localStorage: LocalStorageService
    ) {}

    canActivate(): boolean {
        let token = this.localStorage.get('token');

        if (token) {
            if (this.jwtHelper.isTokenExpired(token)) {
                this.router.navigateByUrl('/');
                return false;
            } else {
                return true;
            }
        } else {
            sessionStorage.setItem('status', 'nologin');
            this.router.navigateByUrl('/');
            return false;
        }
    }
}