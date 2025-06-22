import {
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActiveSectionService } from '../../services/active-section/active-section.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  public routers = [
    {
      name: 'INICIO',
      route: '/inicio',
      goTo: 'inicio',
    },
    {
      name: 'CURSOS',
      route: '/service',
      goTo: 'services',
    },
    {
      name: 'CONTACTO',
      route: '/contact',
      goTo: 'contact',
    }
  ];

  public sidebarVisible: boolean = false;
  private scrollListener: boolean = true;
  public cartVisible: boolean = false;
  public scrollFlag: string = '';
  public url: string = '';
  public paddingScrollHeader = '';

  public favorites: any[] = [];

  public loader: boolean = true;
  public selectedItem: string | null = 'inicio';
  public actualRoute:string = '';

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any,
    private activeSectionService: ActiveSectionService,
    private router: Router,
  ) {
    this.router.events.subscribe(async (event: any) => {
      if (event instanceof NavigationEnd) {
        this.actualRoute = event.url;
        console.log("Actual Route: ", this.actualRoute);
        if(this.actualRoute == "/inicio"){
          this.actualRoute = "/inicio";
        }
      }
    });
    this.activeSectionService.activeSection$.subscribe(section => {
      this.selectedItem = section;
    });
  }

  async ngOnInit() {
    this.scrollListener = true;
    this.renderer.listen('window', 'scroll', (e) => {
      if (this.scrollListener) {
        this.scrollFlag =
          e.target.scrollingElement.scrollTop > 75 ? 'scroll' : '';
        this.paddingScrollHeader = '0px';
      }
    });
  }



  goTo(path: any, event?: any) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        let element = document.querySelector('#' + path) as HTMLElement;
        let topOfElement = element.offsetTop - 50;
        window.scroll({ top: topOfElement, behavior: 'smooth' });
      }, 300);
    }
  }
}
