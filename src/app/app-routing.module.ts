import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path:'',
    redirectTo:'login',
    pathMatch:'full'},
  
   { path:'login', 
    component: LoginComponent
   },
  
  { path:'',
    canActivate: [AuthGuard],
    children:[
      {
       
        path:'dashboard', 
        component: DashboardComponent
          
      },
      {
        path:'search', 
        component: SearchComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
