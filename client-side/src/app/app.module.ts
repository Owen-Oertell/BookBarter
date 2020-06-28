import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SlidingComponent } from './sliding/sliding.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ManageComponent } from './pages/manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SlidingComponent,
    FooterComponent,
    SearchComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
