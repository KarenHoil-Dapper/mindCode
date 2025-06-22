import { Component, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  @ViewChild('swiper2') swiper2?: SwiperComponent;
  public activeIndex: number = 0;
  swiperConfig2: any = {
    allowTouchMove: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    loop: true,
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 3,
      }
    },
  };

  public services: any[] = [
    {
      img: '/assets/images/home/curso1.webp',
      title: 'Introducción a la Programación',
      route: '/marketing'
    },
    {
      img: '/assets/images/home/curso2.webp',
      title: 'Desarrollo web con Angular',
      route: '/platforma-digital'
    },
    {
      img: '/assets/images/home/curso3.webp',
      title: 'JavaScript Avanzado',
      route: '/redes-sociales'
    },
    {
      img: '/assets/images/home/curso4.webp',
      title: 'Backend con Node.js y Express',
      route: '/branding'
    },
    {
      img: '/assets/images/home/curso5.webp',
      title: 'Bases de Datos con MySQL y MongoDB',
      route: '/audiovisual'
    },
    {
      img: '/assets/images/home/curso6.webp',
      title: 'Desarrollo de Aplicaciones Móviles con Flutter',
      route: '/apps'
    }
  ]

  onSlideChange() {
    if (this.swiper2) {
      this.activeIndex = this.swiper2.swiperRef.realIndex;
    }
  }
  goToPrevSlide() {

  }

  goToNextSlide() {


  }
}
