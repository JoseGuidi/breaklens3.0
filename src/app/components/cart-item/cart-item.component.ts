import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Pic } from 'src/app/interfaces/pic';
import { CartService } from 'src/app/services/PicsService/cart.service';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item?: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean };
  @Input() enMostrarTodos?:boolean;
  @Input() enResumen?: boolean;
  inGallery: boolean = false;
  fotoVertical: boolean = false;
  imagenVertical: boolean = false;
  myForm:FormGroup;
  options = [
    { value: '1', label: '1 unidad '},
    { value: '2', label: '2 unidades' },
    { value: '3', label: '3 unidades' },
    { value: '4', label: '4 unidades' },
    { value: '5', label: '5 unidades' }
  ];
  constructor(
    private cartService: CartService,
    private loc: LocationStrategy,private fb: FormBuilder
  ) {
    if(this.item){

      this.myForm = this.fb.group({
        selectedOption: new FormControl(this.item.q)
      });
    }else{
      this.myForm = this.fb.group({
        selectedOption: new FormControl('1')
      });
    }

  }
  ngOnInit(): void {
    if (this.loc.path().startsWith('/galeria/')) {
      this.inGallery = true;
    } else {
      this.inGallery = false;
    }
    if(this.item){
      this.myForm = this.fb.group({
        selectedOption: new FormControl(this.item.q)
      });
    }
  }

  ngAfterViewInit(): void {
    /*
  let imagenes = document.querySelectorAll('.individual');
    imagenes.forEach( (i) => {
      let img = i as HTMLElement;
      if(img.offsetHeight > img.offsetWidth){
        i.classList.add('img_vertical');
      }

    })*/
    let img = document.querySelector(
      '#_' + this.item?.f.id_carpeta + '-' + this.item?.p.id_foto
    ) as HTMLImageElement;
    if (this.inGallery) {
      img.onload = function () {
        const ancho = img.width;
        const alto = img.height;
        if (alto > ancho) {
          img.classList.add('img_vertical');
        }
      };
    }
  }
  onOptionChange( item: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean },event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.cartService.actualizarCarrito(
      item.f,
      item.p,
      item.i,
      parseInt(selectedValue),
      item.d
    );
  }
  cambiarCantidad(
    item: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean },
    accion: any
  ) {

      /*this.cartService.actualizarCarrito(
        item.f,
        item.p,
        item.i,
        accion,
        item.d
      );*/

    console.log(item.q,accion)
  }
  hacerCuenta(precioF: Number, cantidad: Number): number {
    return precioF.valueOf() * cantidad.valueOf();
  }

  prohibirDescarga(event: any) {
    event.preventDefault();
  }
  extras(): any {
    let aux = [];
    if (this.item) {
      for (let i = 1; i < this.item.f.individual.valueOf(); i++) {
        aux.push(i);
      }
      return aux;
    }
  }
  contieneExtras() {
    if (this.item) {
      return this.item.f.individual.valueOf() > 1;
    } else {
      return false;
    }
  }
  eliminarElemento() {
    //this.item = null;
    if (this.item) this.cartService.borrarElemento(this.item);
  }
  moverMas() {
    return this.inGallery && this.extras().length === 1;
  }
  contieneDigital() {
    return this.item?.f.digital !== 0;
  }
  agregarDigital(item: {
    f: Folder;
    p: Pic;
    i: Institution;
    q: Number;
    d: boolean;
  }) {
    let dig = !item.d;
    this.cartService.agregarDigitalDeFoto(
      item.f,
      item.p,
      item.i,
      item.q,
      dig
    );
  }
  checkImagenVertical(id_carpeta: Number, id_foto: number) {
    let imagenes = document.querySelectorAll('.individual');
    imagenes.forEach((i) => {
      let img = i as HTMLElement;
      if (img.offsetHeight > img.offsetWidth) {
        i.classList.add('img_vertical');
      }
    });
  }
  yaAgregoDigital(){

    return this.item?.d
  }
  parseInt(i:any){
    return parseInt(i);
  }
}
