import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogotipoComponent } from './logotipo/logotipo.component';
import { SupHeaderComponent } from './sup-header/sup-header.component';
=======
import { WebuserService } from 'src/Servicios/webuser.service';
>>>>>>> refs/remotes/origin/master

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogotipoComponent,
    SupHeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent },
<<<<<<< HEAD
      { path: 'logotipo', component: LogotipoComponent },
      { path: 'sup-header', component: SupHeaderComponent },
    ]),
    BrowserAnimationsModule
=======
      { path: '**', pathMatch: 'full', redirectTo:'home'  },
    ])
>>>>>>> refs/remotes/origin/master
  ],
  providers: [WebuserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
