import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Pic } from 'src/app/interfaces/pic';
import { DataService } from 'src/app/services/PicsService/data.service';

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
  @Input() listadoItems?: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[]
  @Input() enDatosPersonales?:boolean
  @Input() enMetodoEntrega?:boolean 
  @Input() enResumen?:boolean
  @Input() enMetodoPago?:boolean 
  @Input() enMostrarTodos?:boolean;
  @Input() entregaEnDomicilio?:boolean;
  @Input() formDatosPersonales?:FormGroup;
  
  costoEnvio:any;
  constructor(private _dataService:DataService, private _router:Router){
    console.log("hola " + this.listadoItems)
    if(this.listadoItems){
      if(this.listadoItems?.length > 0){
      this._dataService.obtenerDatosEnvio('7000').subscribe((precio)=>{
       
        if(precio.costo == 0){
          this.costoEnvio = 'Gratis'
        }else{
          this.costoEnvio = precio.costo;
        }
      })
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
    this.listadoItems?.forEach((pos) => {
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
