import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-checkpoint',
  templateUrl: './navbar-checkpoint.component.html',
  styleUrls: ['./navbar-checkpoint.component.scss']
})
export class NavbarCheckpointComponent {
  inInicio:boolean = true;
  inTutorial:boolean = false;
  inComentarios:boolean = false;
  inAbout:boolean = false;
  constructor(private route:Router){}
  scrollTo(id:string) {
    this.route.navigate(['/inicio'])
    this.inInicio = false;
    this.inTutorial = false;
    this.inComentarios = false;
    this.inAbout = false;
    if(id === 'i'){
      this.inInicio = true
      id = 'index';
    }else if (id === 't'){
      this.inTutorial = true
      id = 'tutorial'
    }else if(id === 'a') {
      id='about'
    }else {
      this.inComentarios = true;
      id = 'comentarios'
    }
    let section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scrollY = window.scrollY;
    let windowHeight = window.innerHeight; //px de 100%  pantalla
    // el - 1/2*wh se debe a que quiero que a al mitad cambie de check
    if(scrollY < windowHeight - 1/2*windowHeight){
      this.inInicio = true;
      this.inTutorial = false;
      this.inComentarios = false;
      this.inAbout= false
    }else if(scrollY >= windowHeight - 1/2*windowHeight && scrollY < 2*windowHeight - 2/3*windowHeight){
      this.inInicio = false;
      this.inTutorial = false;
      this.inComentarios = false;
      this.inAbout = true;
      console.log('hola')
    }else if( scrollY >= windowHeight - 1/2*windowHeight && scrollY < 3*windowHeight - windowHeight) {
      this.inInicio = false;
      this.inTutorial = true;
      this.inComentarios = false;
      this.inAbout = false
    }else{
      this.inInicio = false;
      this.inTutorial = false;
      this.inComentarios = true;
      this.inAbout = false;
    }


  }
}
