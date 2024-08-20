import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any;
  repo: any;
  followersList: any;
  followingList: any;
  users: any[] = [];
  searchQuery: string ='';
  isSpinner: boolean = false;
  showfollow: boolean = false;
  isFollowing: boolean = false;
  modalRef?: BsModalRef;

  private token: string | null = '';

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.isSpinner = true;
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    this.token = loginData.token;
    const username = this.route.snapshot.paramMap.get('id');

    if (username) {
      this.showfollow = false;
        this.dashboardService.getUserByUsername(username).subscribe(users => {
            this.user = users;
            this.isSpinner = false;
            this.checkIfFollowing(username);
        });

        this.dashboardService.getUserRepositories(username).subscribe(repos => {
            this.repo = repos;
            this.isSpinner = false; 
        });
        this.dashboardService.getFollowers(username).subscribe(follower => {
          this.followersList = follower;
        });
        this.dashboardService.getFollowing(username).subscribe(following => {
          this.followingList = following;
        });
    } else if (this.token) {
      this.showfollow = true;
        this.dashboardService.getUserProfile(this.token).subscribe(profile => {
            this.user = profile;
        });

        this.dashboardService.getRepository(this.token).subscribe(repos => {
            this.repo = repos;
        });
        this.dashboardService.getMyFollowers(this.token).subscribe(follower => {
          this.followersList = follower;
        });
        this.dashboardService.getMyFollowing(this.token).subscribe(following => {
          this.followingList = following;
          this.isSpinner = false; 
        });
    } else {
        console.error('No token found in local storage.');
    }
  }


  onSearch(): void {
    if (this.searchQuery) {
      this.dashboardService.searchUsers(this.searchQuery).subscribe({
       next: data => this.users = data.items,
       error: error => console.error('Error fetching data:', error)
    });
    } else {
      this.users = [];
    }
  }

  followers(template: TemplateRef<void>){
    this.modalRef = this.modalService.show(template);
    if (this.followersList) {
      this.dashboardService.getFollowers(this.followersList).subscribe({
       next: data => this.followersList = data,
       error: error => console.error('Error fetching data:', error)
    });
    } else {
      this.followersList = [];
    }
  }
  
  following(template1: TemplateRef<void>){
    this.modalRef = this.modalService.show(template1);
    if (this.followingList) {
      this.dashboardService.getFollowing(this.followingList).subscribe({
       next: data => this.followingList = data,
       error: error => console.error('Error fetching data:', error)
    });
    } else {
      this.followingList = [];
    }
  }

  checkIfFollowing(username: string): void {
    if (this.token) {
      this.dashboardService.checkIfFollowing(username, this.token).subscribe({
        next: () => {
          this.isFollowing = true;
        },
        error: () => {
          this.isFollowing = false;
        }
      });
    }
  }
  

  userFollow() {
    if (!this.token) return;
    if (this.isFollowing) {
      this.dashboardService.unfollowUser(this.user.login, this.token).subscribe({
        next: () => {
          this.isFollowing = false;
        }
      });
    } else {
      this.dashboardService.followUser(this.user.login, this.token).subscribe({
        next: () => {
          this.isFollowing = true;
        }
      });
    }
  }
  

  
}
