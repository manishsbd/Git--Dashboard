import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-user-detail',
  templateUrl: './search-user-detail.component.html',
  styleUrl: './search-user-detail.component.css'
})
export class SearchUserDetailComponent implements OnInit {
  user: any;
  repo: any;


  constructor(
    private route: ActivatedRoute,  
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('id');
    if (username) {
      this.dashboardService.getUserByUsername(username).subscribe(user => {
        this.user = user;
      });
      this.dashboardService.getUserRepositories(username).subscribe(repos => {
        this.repo = repos;
      });
    }
  }

  // UserDetail(): void {
  //   const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
  //   this.token = loginData.token;

  //   if (this.token) {
  //     this.dashboardService.getUserProfile(this.token).subscribe(profile => {
  //       this.user = profile;
  //     });

  //     this.dashboardService.getRepository(this.token).subscribe(repos => {
  //       this.repo = repos;
  //     });
  //   } else {
  //     console.error('No token found in local storage.');
  //   }
  // }
}
