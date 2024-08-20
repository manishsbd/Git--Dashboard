import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = 'https://api.github.com/user';
  private repoUrl ='https://api.github.com/user/repos';
  private userUrl = 'https://api.github.com/search/users';
  private searchUrl ='https://api.github.com/users'

  

  constructor(private http: HttpClient) { }

  searchUsers(query: string): Observable<any> {
    const url = `${this.userUrl}?q=${query}`;
    return this.http.get<any>(url);
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
  getMyFollowers(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/followers`, {
      headers: new HttpHeaders().set('Authorization', `token ${token}`)
    });
  }
  getMyFollowing(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/following`, {
      headers: new HttpHeaders().set('Authorization', `token ${token}`)
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.searchUrl}/${username}`);
  }
  getUserRepositories(username: string): Observable<any> {
    return this.http.get<any>(`${this.searchUrl}/${username}/repos`);
  }
  getFollowers(username: string): Observable<any> {
    return this.http.get<any>(`${this.searchUrl}/${username}/followers`);
  }
  getFollowing(username: string): Observable<any> {
    return this.http.get<any>(`${this.searchUrl}/${username}/following`);
  }
  
  
  checkIfFollowing(username: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/following/${username}`, {
      headers: {
        'Authorization': `token ${token}`
      }
    });
  }

  followUser(username: string, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/following/${username}`, {
      'username': username,
    }, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `token ${token}`
      }
    });
  }

  unfollowUser(username: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/following/${username}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `token ${token}`,
        'Content-Length': '0'
      }
    });
  }

}
