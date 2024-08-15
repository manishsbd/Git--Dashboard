import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any;
  repo: any;
  users: any[] = [];
  searchQuery: string ='';

  private token: string | null = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    this.token = loginData.token;

    if (this.token) {
      this.dashboardService.getUserProfile(this.token).subscribe(profile => {
        this.user = profile;
      });

      this.dashboardService.getRepository(this.token).subscribe(repos => {
        this.repo = repos;
      });
    } else {
      console.error('No token found in local storage.');
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.dashboardService.searchUsers(this.searchQuery).subscribe({
       next: data => this.users = data.items,
       error: error => console.error('Error fetching data:', error)
    });
    } else {
      this.users = [];
    }
  }
  


}
