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
  me: any;
  myrepo: any;
  followersList: any;
  followingList: any;
  users: any[] = [];
  repos: any;
  profile: any[] =[];
  myrepos:any;
  searchQuery: string ='';
  isSpinner: boolean = false;
  showfollow: boolean = false;
  isFollowing: boolean = false;
  modalRef?: BsModalRef;

  private token: string | null = '';

constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private modalService: BsModalService) { }

ngOnInit() {
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
        this.isSpinner = false; 
      });
  } else if (this.token) {
    this.isSpinner = true; 
    this.showfollow = true;
      this.dashboardService.getUserProfile(this.token).subscribe(profile => {
          this.me = profile;
      });
      this.dashboardService.getRepository(this.token).subscribe(myrepos => {
          this.myrepo = myrepos;
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
onSearch(){
  if (this.searchQuery) {
    this.dashboardService.searchUsers(this.searchQuery).subscribe({
    next: data => this.users = data.items
  });
  } else {
    this.users = [];
  }
}

followers(template: TemplateRef<void>) {
  this.modalRef = this.modalService.show(template);
  const username = this.user ? this.user.login : this.me?.login;
  if (this.token && username) {
    this.dashboardService.getFollowers(username).subscribe({
      next: data => {
        this.followersList = data.map((follower: any) => {
          this.dashboardService.checkIfFollowing(follower.login, this.token!).subscribe({
            next: () => {
              follower.isFollowing = true;
            },
            error: () => {
              follower.isFollowing = false;
            }
          });
          return follower;
        });
      },
    });
  }
}

following(template1: TemplateRef<void>) {
  this.modalRef = this.modalService.show(template1);
  const username = this.user ? this.user.login : this.me?.login;

  if (this.token && username) {
    this.dashboardService.getFollowing(username).subscribe({
      next: data => {
        this.followingList = data.map((following: any) => {
          this.dashboardService.checkIfFollowing(following.login, this.token!).subscribe({
            next: () => {
              following.isFollowing = true;
            },
            error: () => {
              following.isFollowing = false;
            }
          });
          return following;
        });
      },
    });
  }
}



closeModal(){
  this.modalRef?.hide();

}

checkIfFollowing(username: string){
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

followusermodal(user: any) {
  if (!this.token) return;
  
  if (user.isFollowing) {
    this.dashboardService.unfollowUser(user.login, this.token).subscribe(() => {
      user.isFollowing = false;
      this.isSpinner = false;
    });
  } else {
    this.dashboardService.followUser(user.login, this.token).subscribe(() => {
      user.isFollowing = true;
    });
  }
}

  
}
