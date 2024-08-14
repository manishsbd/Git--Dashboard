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


}
