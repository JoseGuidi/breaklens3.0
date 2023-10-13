import { DataService } from './../../../services/PicsService/data.service';
import { CartService } from './../../../services/PicsService/cart.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Folder } from '../../../interfaces/folder';
import { Institution } from '../../../interfaces/institution';
import { Pic } from '../../../interfaces/pic';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.scss']
})
export class ResumenPagoComponent {
  @Output() eventRedirigirPago = new EventEmitter<any>();
  @Output() eventAvanzarEntrega = new EventEmitter<any>();
  @Output() eventAvanzarResumen = new EventEmitter<any>();
  @Output() eventAvanzarMetodoPago = new EventEmitter<any>();
  @Output() eventAvanzarMostrarTodos = new EventEmitter<any>();
  lItems?: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[]
  @Input() enDatosPersonales?:boolean
  @Input() enMetodoEntrega?:boolean
  @Input() enResumen?:boolean
  @Input() enMetodoPago?:boolean
  @Input() enMostrarTodos?:boolean;
  @Input() entregaEnDomicilio?:boolean;
  @Input() formDatosPersonales?:FormGroup;

  @Input() costoEnvio:any;
  constructor(private _dataService:DataService, private _router:Router, private _cartService:CartService){
    _cartService.carrito.subscribe( c=>{
      this.lItems = c;
      this.lItems = [
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
      ];
    })
    if(this.lItems){
      if(this.lItems?.length > 0){

      }else{
        _router.navigate(['/inicio'])
      }
    }
  }
  hacerCuenta(precioF: Number, cantidad: Number): number {
    return precioF.valueOf() * cantidad.valueOf();
  }
  getMontoTotal() {
    let total: number = 0;
    this.lItems?.forEach((pos) => {
      total += pos.f.precio.valueOf() * pos.q.valueOf();
      if (pos.d) {
        total += pos.f.digital.valueOf();
      }
    });
    if(this.costoEnvio !== 'Gratis' && !(this.enMetodoEntrega||this.enDatosPersonales) && this.entregaEnDomicilio){
      total+= this.costoEnvio
    }
    return total;
  }
  redirigirPago() {
    if(this.enMostrarTodos){
      this.eventRedirigirPago.emit();
    }
  }
  getCostoEnvio(){

      if(this.entregaEnDomicilio && this.costoEnvio != 'Gratis'){
        return '$'+this.costoEnvio
      }else{
        return 'Gratis'
      }

  }
  avanzarPaso(){
    if(this.enDatosPersonales){
      this.eventAvanzarEntrega.emit()
    }else if(this.enMetodoEntrega){

      this.eventAvanzarResumen.emit()
    }else if(this.enResumen){
      this.eventAvanzarMetodoPago.emit()
    }else if(this.enMetodoPago){
      this.eventAvanzarMostrarTodos.emit();
    }
  }
}
