import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WebuserService } from 'src/Servicios/webuser.service';
import { LogotipoComponent } from './logotipo/logotipo.component';
import { SupHeaderComponent } from './sup-header/sup-header.component';
import { BotonCamaroneraComponent } from './boton-camaronera/boton-camaronera.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogotipoComponent,
    SupHeaderComponent,
    BotonCamaroneraComponent
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
      { path: '**', pathMatch: 'full', redirectTo:'home'  },
    ])
  ],
  providers: [WebuserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
