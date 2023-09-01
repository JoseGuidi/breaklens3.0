import { LocationStrategy } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Institution } from 'src/app/interfaces/institution';
import { CartService } from 'src/app/services/PicsService/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  inIndex: boolean = true;
  inCart: boolean = false;
  inGalery:boolean = false;
  menuVisible: boolean = false;
  institution?: Institution;
  primeraVez: boolean = true;
  posicionY:number=window.scrollY;
  headerSticky:boolean = false;
  constructor(
    private detectorRef: ChangeDetectorRef,
    private loc: LocationStrategy,
    private cartService: CartService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.menuVisible = false;
    if (this.loc.path() === '/inicio') {
      this.inIndex = true;
    } else {
      this.inIndex = false;
    }
    if (this.loc.path() === '/carrito') {
      this.inCart = true;
      this.cartService.carrito.subscribe(
        (ins) => (this.institution = ins[0].i)
      );
    } else {
      this.inCart = false;
    }
    if(this.loc.path().startsWith('/galeria/')){
      this.inGalery = true;
    }else{
      this.inGalery = false
    }
    if (window.matchMedia('(min-width: 800px)').matches) {
      this.primeraVez = false;
      this.menuVisible = true;
    }
  }
  onResize(event:any) {
    if(event.target.innerWidth >= 800){
      this.menuVisible= true
      this.primeraVez = false;
    }else{
      this.menuVisible=false
    }
  }
  ngAfterViewChecked(): void {
    this.detectorRef.detectChanges();
  }
  ngAfterViewInit() {}
  cambiarMenu() {
    this.primeraVez = false;
    this.menuVisible = !this.menuVisible
  }
  scrollTo(id: String) {
    this.primeraVez = false;
    if (!window.matchMedia('(min-width: 800px)').matches) {
      setTimeout(() => {this.menuVisible = !this.menuVisible}, 100);
    }
    let section = document.querySelector('#' + id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }else{
      this.router.navigate(['inicio'])
      window.scrollTo({ top: 0, behavior: 'smooth' });
     }
    
  }
  onScroll(event:any){
    if(this.agregarHeaderSticky()){
      this.headerSticky = true
    }else{
      this.headerSticky = false;
    }
    this.posicionY = window.scrollY
  }
  agregarHeaderSticky(){
    return this.pantallaDeCelular() && this.posicionY > window.scrollY;
  }
  pantallaDeCelular(){
    return !window.matchMedia('(min-width: 800px)').matches;
  }
}
