import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from 'swiper';
import { AuthService } from './services/auth/auth.service';
SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mindCode';
  public notNav: boolean = false;
  public notNavDash: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.router.events.subscribe(() => {
      this.notNav = this.router.url.includes('/login') || this.router.url.includes('/dashboard');
      this.notNavDash = this.router.url.includes('/dashboard');
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        AOS.init({
          once: true,
        });
      }
    }, 100);
  }

  logOut(){
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
