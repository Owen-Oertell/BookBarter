import { TradeComponent } from './pages/trade/trade.component';
import { SearchComponent } from './pages/search/search.component';
import { ManageComponent } from './pages/manage/manage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'search', component: SearchComponent},
  {path: 'trade', component: TradeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
