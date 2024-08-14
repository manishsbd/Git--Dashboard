import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = 'https://api.github.com/user';
  private repoUrl ='https://api.github.com/user/repos';
  private url = 'https://api.github.com/users/';
  

  constructor(private http: HttpClient) { }

  getUser(username:string){
  this.http.get(this.url + username)
  }

  getUserProfile(token: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'Authorization': `token ${token}`
      }
    });
  }
  getRepository(token: string): Observable<any> {
    return this.http.get(this.repoUrl, {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  }

}
