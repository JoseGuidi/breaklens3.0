import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Payment } from 'src/app/interfaces/payment';
import { Pic } from 'src/app/interfaces/pic';
import { CartService } from 'src/app/services/PicsService/cart.service';
import { DataService } from 'src/app/services/PicsService/data.service';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.scss'],
})
export class CarritoPageComponent {
  listadoItems: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[] =
    [];
  costoEnvio: number = 0; //en caso de que enun futuro tenga costo
  urlLocal: string =
    'https://localhost/trabajos/breaklens/api-proyecto/api/payments/';
  urlHOSTINGER: string = 'https://breaklens.com/api/payments';
  cargandoMP: boolean = false;
  mostrarPopUp: boolean = false;
  completandoDatos: boolean = false;
  elijiendoMetodoPago: boolean = false;
  momentoDePago: boolean = false;
  formDatos: FormGroup;
  mostrarErrorEnForm: boolean = false;
  orderID: String = 'TR';
  cvu: string = '';
  alias: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private data_service: DataService
  ) {
    this.formDatos = new FormGroup({
      name: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cod_postal: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      direc_calle: new FormControl('', [Validators.required]),
      direc_numero: new FormControl('', [Validators.required]),
      direc_piso: new FormControl(''),
    });
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.cartService.carrito.subscribe((cart) => {
      this.listadoItems = cart;

      /*this.listadoItems = [
        {
          f: {
            id_carpeta: 8,
            cod_institucion: 'abc123',
            nombre: 'Completa',
            precio: 1900,
            individual: 1,
            grupal: 1,
            digital: 0,
          },
          p: {
            id_foto: 10,
            cod_institucion: 'abc123',
            ruta: 'Santino_Lavayen_-_6A_Prim.jpg',
            nombres: 'Santino',
            apellido: 'Lavayen',
          },
          i: {
            cod_institucion: 'abc123',
            nombre: 'Prueba Primaria',
            path_foto_grupal: 'pruebaprimaria.jpg',
          },
          q: 1,
          d: false,
        },
        {
          f: {
            id_carpeta: 9,
            cod_institucion: 'abc123',
            nombre: 'Plus',
            precio: 2500,
            individual: 2,
            grupal: 1,
            digital: 700,
          },
          p: {
            id_foto: 11,
            cod_institucion: 'abc123',
            ruta: 'Rinaldi_Maria_Luz_-_6A_Prim.jpg',
            nombres: 'Rinaldi',
            apellido: 'Maria',
          },
          i: {
            cod_institucion: 'abc123',
            nombre: 'Prueba Primaria',
            path_foto_grupal: 'pruebaprimaria.jpg',
          },
          q: 1,
          d: false,
        },
        {
          f: {
            id_carpeta: 10,
            cod_institucion: 'abc123',
            nombre: 'Gold',
            precio: 5000,
            individual: 4,
            grupal: 1,
            digital: 0,
          },
          p: {
            id_foto: 16,
            cod_institucion: 'abc123',
            ruta: 'Maria_Lujan_Lazarte_Moreno_-_6A_Prim.jpg',
            nombres: 'Maria',
            apellido: 'Lujan',
          },
          i: {
            cod_institucion: 'abc123',
            nombre: 'Prueba Primaria',
            path_foto_grupal: 'pruebaprimaria.jpg',
          },
          q: 1,
          d: false,
        },
        {
          f: {
            id_carpeta: 7,
            cod_institucion: 'abc123',
            nombre: 'Individual',
            precio: 1500,
            individual: 1,
            grupal: 0,
            digital: 850,
          },
          p: {
            id_foto: 13,
            cod_institucion: 'abc123',
            ruta: 'Naima_Aguero_-_6A_Prim.jpg',
            nombres: 'Naima',
            apellido: 'Aguero',
          },
          i: {
            cod_institucion: 'abc123',
            nombre: 'Prueba Primaria',
            path_foto_grupal: 'pruebaprimaria.jpg',
          },
          q: 1,
          d: false,
        },
      ];*/
      // console.log(this.listadoItems)

      if (this.listadoItems.length === 0) {
        this.router.navigate(['/inicio']);
      }
    });
    this.cartService.cambiarVisbilidad();
    this.data_service.obtenerDatosExtras().subscribe((data) => {
      this.alias = data.alias;
      this.cvu = data.cbu;
    });
  }
  borrarElementoCarrito(item: {
    f: Folder;
    p: Pic;
    i: Institution;
    q: Number;
  }) {
    this.cartService.borrarElemento(item);
  }
  cambiarCantidad(
    item: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean },
    accion: number
  ) {
    if ((accion === -1 && item.q.valueOf() > 1) || accion === 1) {
      this.cartService.actualizarCarrito(
        item.f,
        item.p,
        item.i,
        accion,
        item.d
      );
    }
  }
  getMontoItem(item: { f: Folder; p: Pic; i: Institution; q: Number }) {
    return item.q.valueOf() * item.f.precio.valueOf();
  }
  getMontoTotal() {
    let total: number = 0;
    this.listadoItems.forEach((pos) => {
      total += pos.f.precio.valueOf() * pos.q.valueOf();
      if (pos.d) {
        total += pos.f.digital.valueOf();
      }
    });
    return total;
  }
  getMontoTotalEnvio() {
    return this.getMontoTotal() + this.costoEnvio;
  }
  completarDatos() {
    if (this.listadoItems.length > 0) {
      this.mostrarPopUp = true;
      this.completandoDatos = true;
      this.momentoDePago = false;
    } else {
      alert('REDIRECCIONAR A GALERIA O APARECER MENSAJE DE CARRITO VACIO');
    }
  }
  redirigirPagoMP() {

    if (this.listadoItems.length > 0) {
      this.momentoDePago = false;
      this.elijiendoMetodoPago = false;
      this.cargandoMP = true;
      let amount: Number = this.getMontoTotal();
      let titulo: String = '';
      let descripcion: String = '';
      this.listadoItems.forEach((elem) => {
        titulo +=
          elem.q +
          ' ' +
          elem.f.nombre +
         '  de ' + elem.i.nombre;
        if (elem.d) {
          //contiene digital el pedido
          titulo += ' con digital. ';
        }else{
          titulo += 'sin digital. ';
        }
        descripcion +=
          'CAR: ' +
          elem.f.id_carpeta +
          '-QUA: ' +
          elem.q +
          '-FOT: ' +
          elem.p.id_foto +
          '-INS: ' +
          elem.i.cod_institucion;

        if (elem.d) {
          //contiene digital el pedido
          descripcion += '-DIG: SI]';
        } else {
          descripcion += '-DIG: NO]';
        }
        let desc = descripcion.valueOf()
        navigator.clipboard.writeText(desc);
      });
      titulo = JSON.stringify(titulo);
      descripcion = JSON.stringify(descripcion);
      let piso = '';
      if (this.formDatos.get('direc_piso')?.value) {
        piso = this.formDatos.get('direc_piso')?.value;
      }
      let direccion =
        this.formDatos.get('direc_calle')?.value +
        ' ' +
        this.formDatos.get('direc_numero')?.value +
        ' ' +
        piso;
      let url =
        this.urlHOSTINGER +
        '?price=' +
        amount +
        '&description=' +
        titulo +
        '&textoDB=' +
        descripcion +
        '&payer_name=' +
        this.formDatos.get('name')?.value +
        '&payer_surname=' +
        this.formDatos.get('apellido')?.value +
        '&payer_email=' +
        this.formDatos.get('email')?.value +
        '&payer_phone=' +
        this.formDatos.get('telefono')?.value +
        '&payer_direc=' +
        direccion;
      this.http.get(url).subscribe((response) => {
        setTimeout(() => {
          this.cargandoMP = false;
          window.open(response.toString(), '_self');
        }, 1500);
      });
    } else {
      alert('REDIRECCIONAR A GALERIA O APARECER MENSAJE DE CARRITO VACIO');
    }
  }
  hacerCuenta(precioF: Number, cantidad: Number): number {
    return precioF.valueOf() * cantidad.valueOf();
  }

  prohibirDescarga(event: any) {
    event.preventDefault();
  }
  closePopUp() {
    this.mostrarPopUp = false;
    this.completandoDatos = false;
    this.elijiendoMetodoPago = false;
  }
  getPrimero() {
    return this.listadoItems[0];
  }
  elegirMetodoPago() {
    if (
      this.formDatos.valid 
    ) {
      this.completandoDatos = false;
      this.elijiendoMetodoPago = true;
      this.momentoDePago = false;
    } else {
      this.mostrarErrorEnForm = true;
      setTimeout(() => {
        this.mostrarErrorEnForm = false;
      }, 3000);
      if (this.formDatos.invalid) {
        Object.values(this.formDatos.controls).forEach(control => {
          control.markAsTouched();
        });
        return;
      }
    }
    
  }
  mostrarDatosTranf() {
    this.elijiendoMetodoPago = false;

    this.cargandoMP = true;
    let desc = this.generateDescription();
    let titDB = this.generateTituloDB();
    let price = this.getMontoTotal();
    let piso = '';
    if (this.formDatos.get('direc_piso')?.value) {
      piso = this.formDatos.get('direc_piso')?.value;
    }
    let direccion =
      this.formDatos.get('direc_calle')?.value +
      ' ' +
      this.formDatos.get('direc_numero')?.value +
      ' ' +
      piso;
    let url_tr =
      'https://breaklens.com/api/transfer?price=' +
      price +
      '&description=' +
      desc +
      '&textoDB=' +
      titDB +
      '&payer_name=' +
      this.formDatos.get('name')?.value +
      '&payer_surname=' +
      this.formDatos.get('apellido')?.value +
      '&payer_email=' +
      this.formDatos.get('email')?.value +
      '&payer_phone=' +
      this.formDatos.get('telefono')?.value +
      '&payer_direc=' +
      direccion;
    this.http.get(url_tr).subscribe((order_id) => {
      let idTR = order_id;
      this.orderID = 'TR' + order_id;
      setTimeout(() => {
        this.cargandoMP = false;
        this.momentoDePago = true;

        // hacer post a base de datos con cada item;
        this.listadoItems.forEach((item) => {
          let inst = item.f.cod_institucion;
          let carp = item.f.id_carpeta;
          let foto = item.p.id_foto;

          let digit;
          if (item.d) {
            digit = 1;
          } else {
            digit = 0;
          }
          let cant = item.q;

          let url_item =
            'https://breaklens.com/api/itemTR?inst=' +
            inst +
            '&carp=' +
            carp +
            '&foto=' +
            foto +
            '&digit=' +
            digit +
            '&cant=' +
            cant + '&idTR='+idTR;
          this.http.get(url_item).subscribe(()=>{
              
          });
        });
      }, 1500);
    });
  }

  cambiarPaso(paso: String) {
    if (paso === 'd') {
      this.completandoDatos = true;
      this.elijiendoMetodoPago = false;
      this.momentoDePago = false;
    } else if (paso === 'm' && !this.completandoDatos) {
      this.elijiendoMetodoPago = true;
      this.momentoDePago = false;
      this.completandoDatos = false;
    } else if (
      paso === 'f' &&
      !this.elijiendoMetodoPago &&
      !this.completandoDatos
    ) {
      this.elijiendoMetodoPago = false;
      this.momentoDePago = true;
      this.completandoDatos = false;
    }
  }

  private generateDescription() {
    let titulo = '';
    this.listadoItems.forEach((elem) => {
      titulo +=
        elem.q +
        ' carpeta ' +
        elem.f.nombre +
        ' de ' +
        elem.p.nombres +
        ' ' +
        elem.p.apellido;
      if (elem.d) {
        //contiene digital el pedido
        titulo += ' con digital --';
      } else {
        titulo += ' --';
      }
    });
    return titulo;
  }
  private generateTituloDB() {
    let tituloDB = '';
    this.listadoItems.forEach((elem) => {
      tituloDB +=
        'CAR: ' +
        elem.f.id_carpeta +
        ' QUA: ' +
        elem.q +
        ' FOT: ' +
        elem.p.id_foto +
        ' INS: ' +
        elem.i.cod_institucion;
      if (elem.d) {
        //contiene digital el pedido
        tituloDB += ' DIG: SI | ';
      } else {
        tituloDB += ' DIG: NO| ';
      }
    });
    return tituloDB;
  }



  aliasCopiado: boolean = false;
  cvuCopiado: boolean = false;
  copiarCVU(texto: string) {
    navigator.clipboard.writeText(texto);
    this.cvuCopiado = true;
    setTimeout(() => {
      this.cvuCopiado = false;
    }, 1500);
  }
  copiarAlias(texto: string) {
    navigator.clipboard.writeText(texto);
    this.aliasCopiado = true;
    setTimeout(() => {
      this.aliasCopiado = false;
    }, 1500);
  }
  redirigirHome() {
    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 1000);
  }
}
