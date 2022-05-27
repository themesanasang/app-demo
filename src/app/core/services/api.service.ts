import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';

let BASE_URL = env.serverUrl;
let token : any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(
    private httpClient: HttpClient, 
    private localStorage: LocalStorageService
  ) {
    this.setHttpOption();
  }

  private setHttpOption() {
    token = this.localStorage.get('token');
    if (token !== '') {
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
        };
    }
  }

  public get(path: string): Observable<any> {
    this.setHttpOption();

    return this.httpClient.get(BASE_URL + path, this.httpOptions)
      .pipe(catchError(this.formatErrors));    
  }

  public put(path: string, body: object = {}): Observable<any> {
    this.setHttpOption();

    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    this.setHttpOption();

    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    this.setHttpOption();
    
    return this.httpClient.delete(BASE_URL + path, this.httpOptions)
    .pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}