import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TestimonyCardComponent } from '../testimony-card/testimony-card.component';
import { Testimony } from '../../class/TestimonyClass';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
})
export class OpinionesComponent {
  /*cAnterior?:Testimony
  cActual?:Testimony
  cSiguiente?:Testimony
  contadorAn:number = 0;
  contadorAc:number = 1;
  contadorSi:number = 2;
  inMobile:boolean = true;
  esClickeable:boolean = true;
  seActualizoComentario:boolean = false
  */ listaTestimonios: Testimony[] = [
    new Testimony(
      'Pepe Lopez',
      'fotopepe.jpg',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sed alias quis tenetur quisquam quibusdam, harum dolorem praesentium id veritatis magnam eveniet optio tempora sunt ab quod sequi asperiores dolor.',
      4
    ),
    new Testimony(
      'Gustavo Hernandez',
      'fotopepe.jpg',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sed alias quis tenetur quisquam quibusdam, harum dolorem praesentium id veritatis magnam eveniet optio tempora sunt ab quod sequi asperiores dolor.',
      1
    ),
    new Testimony(
      'Martina Guillermo',
      'fotopepe.jpg',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sed alias quis tenetur quisquam quibusdam, harum dolorem praesentium id veritatis magnam eveniet optio tempora sunt ab quod sequi asperiores dolor.',
      5
    ),
    new Testimony(
      'Lucas Telecom',
      'fotopepe.jpg',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sed alias quis tenetur quisquam quibusdam, harum dolorem praesentium id veritatis magnam eveniet optio tempora sunt ab quod sequi asperiores dolor.',
      3
    ),
    new Testimony(
      'Leonardo Gutierrez',
      'fotopepe.jpg',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sed alias quis tenetur quisquam quibusdam, harum dolorem praesentium id veritatis magnam eveniet optio tempora sunt ab quod sequi asperiores dolor.',
      5
    ),
    new Testimony(
      'Lucas Ignacio',
      'fotopepe.jpg',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sed alias quis tenetur quisquam quibusdam, harum dolorem praesentium id veritatis magnam eveniet optio tempora sunt ab quod sequi asperiores dolor.',
      3
    ),
  ];
  @ViewChild('carouselElemento', { static: true }) carouselElemento:
    | ElementRef
    | undefined;
  @ViewChild('flechaIzquierda', { static: true }) flechaIzquierda:
    | ElementRef
    | undefined;
  @ViewChild('flechaDerecha', { static: true }) flechaDerecha:
    | ElementRef
    | undefined;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef | undefined;

  firstCardWidth: number = 0;
  carouselChildrens: HTMLElement[] = [];

  isDragging: boolean = false;
  isAutoPlay: boolean = true;
  startX: any;
  startScrollLeft: any;
  timeoutId: any;
  cardPerView: number = 0;
  ngOnInit(): void {
    // ancho de primer card
    this.firstCardWidth =
      this.carouselElemento?.nativeElement.querySelector('.card').offsetWidth;

    this.carouselChildrens = Array.from(
      this.carouselElemento?.nativeElement.children
    ).map((element: any) => element.cloneNode(true));

    // cards por vista
    this.cardPerView = Math.round(
      this.carouselElemento?.nativeElement.offsetWidth / this.firstCardWidth
    );

    this.carouselChildrens
      .slice(-this.cardPerView)
      .reverse()
      .forEach((card: { outerHTML: string }) => {
        this.carouselElemento?.nativeElement.insertAdjacentHTML(
          'afterbegin',
          card.outerHTML
        );
      });

    this.carouselChildrens
      .slice(0, this.cardPerView)
      .forEach((card: { outerHTML: string }) => {
        this.carouselElemento?.nativeElement.insertAdjacentHTML(
          'beforeend',
          card.outerHTML
        );
      });

    this.carouselElemento?.nativeElement.classList.add('no-transition');
    if (this.carouselElemento) {
      this.carouselElemento.nativeElement.scrollLeft =
        this.carouselElemento?.nativeElement.offsetWidth;
      this.carouselElemento?.nativeElement.classList.remove('no-transition');
    }

    this.flechaIzquierda?.nativeElement.addEventListener('click', () => {
      if (this.carouselElemento) {
        this.carouselElemento.nativeElement.scrollLeft = this.carouselElemento.nativeElement.scrollLeft - this.firstCardWidth;
      }
    });
    this.flechaDerecha?.nativeElement.addEventListener('click', () => {
      if (this.carouselElemento) {
        this.carouselElemento.nativeElement.scrollLeft += this.firstCardWidth;
      }
    });
    this.autoPlay();
    /* this.cAnterior = this.listaTestimonios[this.contadorAn];
    this.cActual = this.listaTestimonios[this.contadorAc]
    this.cSiguiente = this.listaTestimonios[this.contadorSi]
    this.checkInMobile()*/
    /*setInterval(
      () => {
        this.contadorAn = this.contadorAc
        this.contadorAc = this.contadorSi
        if(this.contadorSi === this.listaTestimonios.length - 1){
          this.contadorSi = 0;
        }else{
          this.contadorSi = this.contadorSi + 1;
        }
        this.cAnterior = this.listaTestimonios[this.contadorAn];
    this.cActual = this.listaTestimonios[this.contadorAc]
    this.cSiguiente = this.listaTestimonios[this.contadorSi]
      },
      7000
    )*/
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.checkInMobile();
  }
  checkInMobile() {
    // this.inMobile = window.innerWidth < 800;
  }
  cambiarTestimonio(n: number) {
    //if(!this.inMobile){
    /*if(this.esClickeable){
      this.esClickeable = false
        if(n === -1 && this.contadorAn !== 0){
          this.contadorAn += n;
          this.contadorSi += n;
          this.contadorAc += n;
          this.seActualizoComentario = true
        }else if( n=== 1 && this.contadorSi < this.listaTestimonios.length -1){
          this.contadorAn += n;
          this.contadorSi += n;
          this.contadorAc += n;
          this.seActualizoComentario = true
        }
        this.cAnterior = this.listaTestimonios[this.contadorAn];
        this.cActual = this.listaTestimonios[this.contadorAc]
        this.cSiguiente = this.listaTestimonios[this.contadorSi]
        setTimeout( () => {
          this.seActualizoComentario = false
          this.esClickeable = true;
        },3000)*/
    /*}
      else{
        pensarcelu
      }*/
    //}
  }

  dragStart(e: any) {
    this.isDragging = true;
    this.carouselElemento?.nativeElement.classList.add('dragging');
    this.startX = e.pageX;
    this.startScrollLeft = this.carouselElemento?.nativeElement.scrollLeft;
  }
  dragging(e: any) {
    if (!this.isDragging) {
      return;
    } else {
      if (this.carouselElemento)
        this.carouselElemento.nativeElement.scrollLeft =
          this.startScrollLeft - (e.pageX - this.startX);
    }
  }
  dragStop() {
    this.isDragging = false;
    this.carouselElemento?.nativeElement.classList.remove('dragging');
  }
  infiniteScroll() {
    if (this.carouselElemento?.nativeElement.scrollLeft === this.firstCardWidth) {
      this.carouselElemento.nativeElement.classList.add('no-transition');
      this.carouselElemento.nativeElement.scrollLeft =
        this.carouselElemento.nativeElement.scrollWidth -
        2 * this.carouselElemento.nativeElement.offsetWidth;
      this.carouselElemento.nativeElement.classList.remove('no-transition');
    }
    // If the carousel is at the end, scroll to the beginning
    else if (
      Math.ceil(this.carouselElemento?.nativeElement.scrollLeft) ===
      this.carouselElemento?.nativeElement.scrollWidth -
        this.carouselElemento?.nativeElement.offsetWidth
    )
    clearTimeout(this.timeoutId);
      if (!this.wrapper?.nativeElement.matches(':hover')) this.autoPlay();
  }
  autoPlay() {
    if (window.innerWidth < 800 || !this.isAutoPlay) return;

    this.timeoutId = setTimeout(() => {
      if (this.carouselElemento?.nativeElement) {
        this.carouselElemento.nativeElement.scrollLeft += this.firstCardWidth;
      }
    }, 15000);
  }
  clearTime() {
    clearTimeout(this.timeoutId);
  }
  forEstrellas(cant:number):Number[]{
    let array = []
    for(let i = 0 ; i < cant; i++){
      array.push(i)
    }
    return array;
  }
}
