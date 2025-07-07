import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { CountUpModule } from 'ngx-countup';
import { PrimengModule } from './extra-module/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { SwiperModule } from 'swiper/angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from './app.component';
import { MainBannerComponent } from './components/home/main-banner/main-banner.component';
import { HomeComponent } from './pages/home/home.component';
import { NumberComponent } from './components/home/number/number.component';
import { ServicesComponent } from './components/home/services/services.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { AboutNewComponent } from './components/home/about-new/about-new.component';
import { PrivacityComponent } from './pages/privacity/privacity.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    MainBannerComponent,
    HomeComponent,
    NumberComponent,
    ServicesComponent,
    ContactComponent,
    AboutNewComponent,
    PrivacityComponent,
    LoginComponent,
    AuthFormComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    ToastModule,
    CountUpModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    [provideHttpClient(withFetch())],
    provideClientHydration(),
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
