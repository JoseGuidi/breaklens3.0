import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { Institution } from 'src/app/interfaces/institution';
import { CartService } from 'src/app/services/PicsService/cart.service';
import { DataService } from 'src/app/services/PicsService/data.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  inIndex:boolean = true;
  inCart: boolean = false;
  inGallery:boolean = false;
  inPayment:boolean = false;
  institution?:Institution;
  constructor(private location: LocationStrategy, private _cartService:CartService,private _dataService:DataService){}

  ngOnInit(): void {
    if (this.location.path() === '/inicio') {
      this.inIndex = true;
    } else {
      this.inIndex = false;
    }
    if (this.location.path() === '/carrito') {
      this.inCart = true;
      this._cartService.carrito.subscribe(
        (ins) => (this.institution= ins[ins.length-1].i)
      );
    } else {
      this.inCart = false;
    }
    if(this.location.path().startsWith('/galeria/')){
      this.inGallery = true;
      let url = this.location.path().split('/')
      let codigo = url[2];
      this._dataService.getInfoInstitution(codigo).subscribe(ins => this.institution = ins)
    }else{
      this.inGallery = false
    }
    if(this.location.path().startsWith('/pago')){
      this.inPayment = true
    }else{
      this.inPayment = false
    }
  }
  disponiblePara(id:String):boolean{
    if(id === 'index'){
      return this.inCart || this.inGallery || this.inPayment
    }else if (id === 'galeria'){
      return this.inCart
    }else if(id === 'cart'){
      return this.inPayment
    }else{
      return false
    }
  }
}
