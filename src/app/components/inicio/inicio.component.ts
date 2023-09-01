import { Component, HostListener, Input } from '@angular/core';
import { SectionClass } from 'src/app/class/SectionClass';
import { LoadingService } from 'src/app/services/PicsService/loading.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  showSpan: boolean = false;
  menuVisible: boolean = false;
  sectionSelected?: SectionClass;
  listaDeSections: SectionClass[] = [];
  llegoFooter:boolean = false
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.listaDeSections = [
      new SectionClass('Inicio', 'home.svg','index'),
      new SectionClass('Tutorial', 'help-circle.svg','tutorial'),
      new SectionClass('Nosotros', 'users.svg','about'),
      new SectionClass('Opiniones', 'star.svg','opiniones'),
    ];
  }
  scrollTo(id: String) {
    this.menuVisible = false;
    let section = document.querySelector('#' + id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  onHoverIcon(b: boolean,s:SectionClass) {

    this.showSpan = b;
    this.sectionSelected = s;
  }
  onClickMenu(b: boolean) {
    this.menuVisible = b;
  }
  debeAparecer(s:SectionClass){
    return s.label == this.sectionSelected?.label && this.showSpan
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const currentPosition = window.scrollY;

    // Porcentaje del scroll actual con respecto al footer
    const footerThreshold = 0.9; // 0.9 significa 90% de la página (100% - 90%)

    if (currentPosition >= (documentHeight - windowHeight) * footerThreshold) {
      // Aquí llegaste al footer
      this.llegoFooter = true;
      // Realiza la acción que desees cuando se llegue al footer
    }else{
      this.llegoFooter = false
    }
  }
}
