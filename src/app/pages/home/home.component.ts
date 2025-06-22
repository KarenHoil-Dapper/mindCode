import { Component, HostListener } from '@angular/core';
import { ActiveSectionService } from '../../services/active-section/active-section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeSection: string | null = null;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.detectActiveSection();
  }

  detectActiveSection() {
    const sections = ['inicio', 'services', 'blog', 'contact'];
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          this.activeSection = sectionId;
          break;
        } else {
          this.activeSection = "";
        }
      }
    }
    this.activeSectionService.setActiveSection(this.activeSection);
  }

  constructor(
    private activeSectionService: ActiveSectionService
  ) {
    this.activeSectionService.setActiveSection("inicio");
  }

}
