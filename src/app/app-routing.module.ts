import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path:'',
    redirectTo:'login',
    pathMatch:'full'},
  
   { path:'login', 
    component: LoginComponent
   },
   
  
  { path:'',
    // canActivate: [AuthGuard],
    children:[
      {
        path:'dashboard', 
        component: DashboardComponent
          
      },
      {
        path:'dashboard/:id', 
        component: DashboardComponent
          
      },
      
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
