import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Pic } from 'src/app/interfaces/pic';
import { CartService } from 'src/app/services/PicsService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Input() carpetaElegida?: Folder;
  @Input() carritoVisible?: boolean;
  @Output() mostrarCarritoChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  cambiarEfecto:boolean = false;
  listaItems: { f: Folder; p: Pic;i:Institution,q:Number,d:boolean }[] = [];
  mostrarCarritoCruz:boolean = true;
  constructor(private cartService: CartService, private router:Router) {}
  ngOnInit(): void {
    this.cartService.carrito.subscribe((cart) => {
      this.listaItems = cart;
    });
    if(window.matchMedia('(max-width: 800px').matches){
      this.mostrarCarritoCruz = false;
    }
    let imagenes = document.querySelectorAll('.individual');
    imagenes.forEach( (i) => {
      let img = i as HTMLElement;
      if(img.offsetHeight > img.offsetWidth){
        i.classList.add('img_vertical');
      }
    })
  }
  controlarCruzYCarrito(){
    if (window.matchMedia('(min-width: 800px)').matches){
      this.mostrarCarritoCruz = true
    }else{
      this.mostrarCarritoCruz = false;
    }
  }
  cambiarEstado() {
    this.cartService.cambiarVisbilidad();
    this.cartService.visibilidadCarrito.subscribe(vis => this.carritoVisible = vis);
    if(window.matchMedia('(max-width: 800px').matches){
      this.mostrarCarritoCruz = false;
    }
  }

  calcularMonto() {
    let total: number = 0;
    this.listaItems.forEach(pos => {
      total += pos.f.precio.valueOf()*pos.q.valueOf();
    });
    return total;
  }
  redirigirCarrito(){
    this.cambiarEfecto = true;
    setTimeout(() =>{
      this.router.navigate(['/carrito'])
    },600)
  }
  cambiarCantidad(item:{ f: Folder; p: Pic;i:Institution,q:Number },accion:number,d:boolean){
    if((accion === -1 && item.q.valueOf() > 1) || (accion === 1)){
      this.cartService.actualizarCarrito(item.f,item.p,item.i,accion,d)
    }
    
  }
  eliminarElemento(item:{ f: Folder; p: Pic;i:Institution,q:Number }){
    this.cartService.borrarElemento(item);
  }
  cambiarACruz(){
    if(window.matchMedia('(min-width: 800px').matches){
      this.mostrarCarritoCruz = false;
    }
  }
  cambiarACarrito(){
    if(window.matchMedia('(min-width: 800px').matches){
      this.mostrarCarritoCruz = true;
    }
  }
  getMontoCarpeta(precio:Number,cant:Number){
    return precio.valueOf() * cant.valueOf();
  }
  prohibirDescarga(event: any) {
    event.preventDefault();
  }
}
