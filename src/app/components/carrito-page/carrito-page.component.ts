import { Institution } from './../../interfaces/institution';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Folder } from './../../interfaces/folder';
import { Pic } from './../../interfaces/pic';
import { CartService } from './../../services/PicsService/cart.service';
import { DataService } from './../../services/PicsService/data.service';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.scss'],
})
export class CarritoPageComponent {
  listadoItems: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[] =
    [];
  //costoEnvio: number = 0; //en caso de que enun futuro tenga costo
  urlLocal: string =
    'https://localhost/trabajos/breaklens/api-proyecto/api/payments/';
  urlHOSTINGER: string = 'https://breaklens.com/api/';

  formDatos!: FormGroup;
  orderID: String = 'TR';
  cvu: string = '';
  alias: string = '';
  cargandoRedireccionPago:boolean = false;
  enDatosPersonales: boolean = true;
  enMetodoEntrega: boolean = false;
  enResumen: boolean = false;
  enMetodoPago: boolean = false;
  enMostrarTodos: boolean = false;
  lugarEntrega: String = '';
  entregaEnDomicilio: boolean = false;
  entregaEnMail:boolean = false;
  metodoPago: String = '';
  mostrarDatosTransferencia: boolean = false;
  costoEnvio:any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private data_service: DataService,
  ) {
    window.scrollTo(0,0);
  }
  ngOnInit(): void {
    //window.scrollTo({ top: 0, behavior: 'smooth' });
    this.cartService.carrito.subscribe((cart) => {
      this.listadoItems = cart;

      /*this.listadoItems = [
        {
          f: {
            id_carpeta: 11,
            cod_institucion: 'aytm21',
            nombre: 'Pack Basico',
            precio: 800,
            individual: 1,
            grupal: 0,
            digital: 500,
            primer_item: '1 fotografia 13x18cm',
            segundo_item: 'vacio',
            tercer_item: 'vacio',
            medidas: '13x18',
          },
          p: {
            id_foto: 189,
            cod_institucion: 'aytm21',
            ruta: '_DSC7396.jpg',
            nombres: '',
            apellido: 'DSC7396',
          },
          i: {
            cod_institucion: 'aytm21',
            nombre: 'Acto 21 Agosto - TM',
            path_foto_grupal: 'vacio',
          },
          q: 1,
          d: false,
        },
        {
          f: {
            id_carpeta: 14,
            cod_institucion: 'aytm21',
            nombre: 'Pack Premium',
            precio: 2000,
            individual: 3,
            grupal: 0,
            digital: 500,
            primer_item: '1 fotografia 15x21cm',
            segundo_item: '2 copias extras 15x21cm',
            tercer_item: 'vacio',
            medidas: '15x21',
          },
          p: {
            id_foto: 186,
            cod_institucion: 'aytm21',
            ruta: '_DSC7380.jpg',
            nombres: '',
            apellido: 'DSC7380',
          },
          i: {
            cod_institucion: 'aytm21',
            nombre: 'Acto 21 Agosto - TM',
            path_foto_grupal: 'vacio',
          },
          q: 1,
          d: false,
        },
        {
          f: {
            id_carpeta: 9,
            cod_institucion: 'abc123',
            nombre: 'Plus',
            precio: 1400,
            individual: 2,
            grupal: 1,
            digital: 700,
            primer_item: '',
            segundo_item: '',
            tercer_item: '',
            medidas: '',
          },
          p: {
            id_foto: 14,
            cod_institucion: 'abc123',
            ruta: 'Montes_angel_-_6A_Prim.jpg',
            nombres: 'Montes',
            apellido: 'angel',
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
            precio: 1,
            individual: 1,
            grupal: 0,
            digital: 1,
            primer_item: '',
            segundo_item: '',
            tercer_item: '',
            medidas: '',
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
            precio: 1100,
            individual: 4,
            grupal: 1,
            digital: 700,
            primer_item: '',
            segundo_item: '',
            tercer_item: '',
            medidas: '',
          },
          p: {
            id_foto: 17,
            cod_institucion: 'abc123',
            ruta: 'Gorosito_Francisco_-_6A_Prim.jpg',
            nombres: 'Gorosito',
            apellido: 'Francisco',
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

      if (this.listadoItems.length === 0) {
        this.router.navigate(['/inicio']);
      }
    });
    this.cartService.cambiarVisbilidad();
    this.data_service.obtenerDatosExtras().subscribe((data) => {
      this.alias = data.alias;
      this.cvu = data.cbu;
    });
    /*this.data_service.obtenerDatosEnvio('7000').subscribe((envio) => {
      this.costoEnvio = envio.costo;
    });*/
    this.data_service.obtenerDatosEnvio('7000').subscribe((precio)=>{
      if(precio.costo == 0){
        this.costoEnvio = 'Gratis'
      }else{
        this.costoEnvio = precio.costo;
      }
    })
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







  manejarDatos(datos: any) {
    this.enDatosPersonales = false;
    this.enMetodoEntrega = true;
    this.formDatos = datos;
  }

  actualizarMetodoEntrega(envio: any) {
    let arrayDirec = envio.value.metodo.split('-');
    this.lugarEntrega =
      arrayDirec[0] + ' ' + arrayDirec[1] + ' ' + arrayDirec[2];
    this.enMetodoEntrega = false;
    this.enResumen = true;
    this.entregaEnDomicilio =
      arrayDirec[0] != 'Cuba' && arrayDirec[1] != '1498';
    this.entregaEnMail = arrayDirec[0] == this.formDatos.get("email")?.value;

  }

  avanzarAMetodoPago() {
    this.enResumen = false;
    this.enMetodoPago = true;
  }

  redirigirPago(metodo: string) {
    this.enMostrarTodos = true;
    this.enMetodoPago = false;
    this.metodoPago = metodo;
  }

  mostrandoTodos() {
    return (
      this.enDatosPersonales &&
      this.enMetodoEntrega &&
      this.enMetodoPago &&
      this.enResumen
    );
  }

  volverAtras(destino: String) {
    this.enMostrarTodos = false
    if (destino == 'datos') {
      this.enMetodoEntrega = false;
      this.enDatosPersonales = true;
    } else if (destino == 'entrega') {
      this.enResumen = false;
      this.enMetodoEntrega = true;
    } else if (destino == 'resumen') {
      this.enMetodoPago = false;
      this.enResumen = true;
    } else if (destino == 'galeria') {
      let ultimoElemento = this.listadoItems[this.listadoItems.length - 1];
      this.router.navigate(['galeria/' + ultimoElemento.i.cod_institucion]);
    }else if(destino == 'pago'){
      this.enMetodoPago = true;
    }else if(destino == 'items'){
      this.enMostrarTodos = false;
      this.enResumen = true;
    }
  }

  elegirTRoMP() {
    this.cargandoRedireccionPago = true

    setTimeout( () =>{
      if ((this.metodoPago == 'transferencia') || (this.metodoPago == 'efectivo')) {
        this.cargandoRedireccionPago = false;
        this.enMostrarTodos = false;
        this.mostrarDatosTransferencia = true;
        this.pushearTransferencia(this.metodoPago);
      } else {
        this.redirigirMercadoPago();
      }
    },1500)
  }

  generateURL(endpoint: string) {
    let descripcion = '';
    let titulo = '';
    let amount = this.getMontoTotal();
    let direccion = '';
    let piso = '';
    let entrega ='';
    if(this.entregaEnMail){
      entrega = "email"
    }else if(this.entregaEnDomicilio){
      entrega = 'domicilio'
    }else{
      entrega = 'retiro'
    }
    this.listadoItems.forEach((item) => {
      titulo += item.q + ' ' + item.f.nombre + ' de ' + item.i.nombre;
      if (item.d) {
        titulo += ' con digital.';
      } else {
        titulo += ' sin digital.';
      }
      descripcion +=
        'CAR: ' +
        item.f.id_carpeta +
        '-QUA: ' +
        item.q +
        '-FOT: ' +
        item.p.id_foto +
        '-INS: ' +
        item.i.cod_institucion;
      if (item.d) {
        //contiene digital el pedido
        descripcion += '-DIG: SI]';
      } else {
        descripcion += '-DIG: NO]';
      }
    });
    titulo = JSON.stringify(titulo);
    descripcion = JSON.stringify(descripcion);
    piso = '';
    if (this.formDatos.get('direc_piso')?.value) {
      piso = this.formDatos.get('direc_piso')?.value;
    }
    direccion =
      this.formDatos.get('direc_calle')?.value +
      ' ' +
      this.formDatos.get('direc_numero')?.value +
      ' ' +
      piso;
    let url =
      this.urlHOSTINGER +
      endpoint +
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
      direccion+'&entrega='+entrega;

      if(endpoint != 'payments'){
        url += "&metodo="+this.metodoPago
      }
      console.log(url);
    return url;
  }

  pushearTransferencia(metodo:String) {
    let url = this.generateURL('transfer');
    this.http.get(url).subscribe((order_id) => {
      let idTR = order_id;
      this.orderID = 'TR' + order_id;
      this.pushearItemsEnBBDD(this.listadoItems, 'itemTR', order_id);
    });
  }
  pushearItemsEnBBDD(items: any, endpoint: string, idTR: any) {
    setTimeout(() => {
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
          cant +
          '&idTR=' +
          idTR;
        this.http.get(url_item).subscribe(() => {});
      });
    }, 1500);
  }
  redirigirMercadoPago() {
    if (this.listadoItems.length > 0) {
      let url = this.generateURL('payments');
      this.http.get(url).subscribe((link_mp) => {
          window.open(link_mp.toString(), '_self');
      });
    }
  }
}
